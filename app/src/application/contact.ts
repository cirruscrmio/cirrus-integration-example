import { createContact, editContact, findContacts } from "~/api";
import config from "~/config";
import { createWinstonLogger } from "~/logger";

import type { ExternalContact } from "./types";

const logger = createWinstonLogger({ level: config.LOG_LEVEL });

/** Ensures the contact behind an order exists on the given account, creating or
 * updating it as needed. Contacts are matched by `externalKey` within the
 * account. Returns the Cirrus contact id, or `undefined` if it could not be
 * resolved. */
export const ensureContact = async (
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
