import {
  createAccount,
  createContact,
  createOrder,
  editAccount,
  editContact,
  editOrder,
  findAccountByExternalKey,
  findAccountUser,
  findContacts,
  findOrderDefaults,
  findOrdersByExternalKey,
} from "~/api";
import config from "~/config";
import { createWinstonLogger } from "~/logger";

import type { ExternalAccount, ExternalContact, ExternalOrder } from "./types";

const logger = createWinstonLogger({ level: config.LOG_LEVEL });

/** Ensures the account behind an order exists in Cirrus, creating it when it is
 * missing and updating it when its data has drifted.
 *
 * The external system's id is stored as the account's `externalKey`, which is
 * what we use to detect whether it has already been synced.
 *
 * Returns the Cirrus account id, or `undefined` if it could not be resolved. */
const ensureAccount = async (
  account: ExternalAccount,
): Promise<number | undefined> => {
  const existing = await findAccountByExternalKey(account.externalId);

  if (existing?.id) {
    // Already synced - only issue an update if something actually changed to
    // avoid pointless writes.
    if (existing.name !== account.name) {
      logger.info("Updating account", {
        accountId: existing.id,
        externalId: account.externalId,
      });
      await editAccount({
        id: existing.id,
        name: account.name,
        typeId: config.CIRRUS_DEFAULT_ACCOUNT_TYPE_ID,
        number: existing.number ?? account.externalId,
        externalKey: account.externalId,
      });
    } else {
      logger.verbose("Account already up to date", {
        accountId: existing.id,
        externalId: account.externalId,
      });
    }

    return existing.id;
  }

  logger.info("Creating account", { externalId: account.externalId });
  const created = await createAccount({
    name: account.name,
    typeId: config.CIRRUS_DEFAULT_ACCOUNT_TYPE_ID,
    userId: config.CIRRUS_DEFAULT_USER_ID,
    number: account.externalId,
    externalKey: account.externalId,
  });

  return created?.id ?? undefined;
};

/** Ensures the contact behind an order exists on the given account, creating or
 * updating it as needed. Contacts are matched by `externalKey` within the
 * account. Returns the Cirrus contact id, or `undefined` if it could not be
 * resolved. */
const ensureContact = async (
  accountId: number,
  contact: ExternalContact,
): Promise<number | undefined> => {
  const contacts = await findContacts(accountId);
  const existing = contacts.find((c) => c.externalKey === contact.externalId);

  if (existing?.id) {
    if (
      existing.name !== contact.firstName ||
      existing.surname !== contact.lastName
    ) {
      logger.info("Updating contact", {
        contactId: existing.id,
        externalId: contact.externalId,
      });
      await editContact({
        id: existing.id,
        accountId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        externalKey: contact.externalId,
      });
    } else {
      logger.verbose("Contact already up to date", {
        contactId: existing.id,
        externalId: contact.externalId,
      });
    }

    return existing.id;
  }

  logger.info("Creating contact", { externalId: contact.externalId });
  const created = await createContact({
    accountId,
    firstName: contact.firstName,
    lastName: contact.lastName,
    externalKey: contact.externalId,
  });

  return created?.id ?? undefined;
};

/** Ensures the order itself exists in Cirrus, linked to the given account and
 * contact. Creates it when missing and updates the account/contact linkage when
 * it has drifted. */
const ensureOrder = async (
  order: ExternalOrder,
  accountId: number,
  contactId: number,
): Promise<void> => {
  const [existing] = await findOrdersByExternalKey(order.externalId);

  if (existing) {
    const linkageChanged =
      existing.account?.id !== accountId || existing.contact?.id !== contactId;

    if (!linkageChanged) {
      logger.verbose("Order already up to date", {
        orderId: existing.id,
        externalId: order.externalId,
      });
      return;
    }

    // Rebuild the order input from the existing Cirrus order, overriding only
    // the account/contact linkage. Bail out if the existing order is missing
    // any of the fields Cirrus requires on an update.
    const { placeDate, paymentTerm, delivery, status, type, user } = existing;

    if (
      !placeDate?.iso ||
      !paymentTerm?.id ||
      !delivery.term?.id ||
      !delivery.type?.id ||
      !status?.id ||
      !type?.id ||
      !user?.id
    ) {
      logger.warn("Not updating order - received partial data from Cirrus", {
        orderId: existing.id,
        externalId: order.externalId,
      });
      return;
    }

    logger.info("Updating order", {
      orderId: existing.id,
      externalId: order.externalId,
    });
    await editOrder({
      input: {
        id: existing.id,
        order: {
          externalKey: order.externalId,
          accountId,
          contactId,
          placeDate: { iso: placeDate.iso },
          paymentTermId: paymentTerm.id,
          delivery: { termId: delivery.term.id, typeId: delivery.type.id },
          statusId: status.id,
          typeId: type.id,
          userId: user.id,
        },
      },
    });

    return;
  }

  // No order synced yet - create a new one. An order requires a payment term,
  // delivery term/type, status, type and an owning user; these are Cirrus-side
  // concepts that rarely exist in the external system, so we fall back to the
  // tenant's configured defaults.
  const [defaults, userId] = await Promise.all([
    findOrderDefaults(),
    findAccountUser(accountId),
  ]);

  const owner = userId ?? config.CIRRUS_DEFAULT_USER_ID;

  if (
    !defaults.paymentTerm?.id ||
    !defaults.deliveryTerm?.id ||
    !defaults.deliveryType?.id ||
    !defaults.orderStatus?.id ||
    !defaults.orderType?.id
  ) {
    logger.error(
      "Not creating order - missing Cirrus order defaults (payment term / delivery term / delivery type / order status / order type)",
      { externalId: order.externalId },
    );
    return;
  }

  logger.info("Creating order", { externalId: order.externalId });
  await createOrder({
    input: {
      order: {
        externalKey: order.externalId,
        accountId,
        contactId,
        placeDate: { iso: new Date().toISOString().slice(0, 10) },
        paymentTermId: defaults.paymentTerm.id,
        delivery: {
          termId: defaults.deliveryTerm.id,
          typeId: defaults.deliveryType.id,
        },
        statusId: defaults.orderStatus.id,
        typeId: defaults.orderType.id,
        userId: owner,
        // Order rows/line items would be mapped here from the external order.
        rows: [],
      },
    },
  });
};

export const syncExternalOrder = async (order: ExternalOrder) => {
  // Ensure associated account exists (created/updated as needed)
  const accountId = await ensureAccount(order.account);
  if (!accountId) {
    logger.warn("Skipping order - could not resolve account", {
      externalId: order.externalId,
      accountExternalId: order.account.externalId,
    });
    return;
  }

  // Ensure associated contact exists on that account
  const contactId = await ensureContact(accountId, order.contact);
  if (!contactId) {
    logger.warn("Skipping order - could not resolve contact", {
      externalId: order.externalId,
      contactExternalId: order.contact.externalId,
    });
    return;
  }

  // Ensure the order itself exists and is linked to the account + contact
  await ensureOrder(order, accountId, contactId);
};

/** Loops through a set of orders and ensures all of them are synced into
 * Cirrus CRM, creating and updating resources as needed */
export const syncExternalOrders = async (externalOrders: ExternalOrder[]) => {
  for (const externalOrder of externalOrders) {
    try {
      await syncExternalOrder(externalOrder);
    } catch (err) {
      logger.error("Failed to sync order", {
        externalId: externalOrder.externalId,
        err,
      });
    }
  }
};
