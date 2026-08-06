import { createAccount, editAccount, findAccountByExternalKey } from "~/api";
import config from "~/config";
import { createWinstonLogger } from "~/logger";

import type { ExternalAccount } from "./types";

const logger = createWinstonLogger({ level: config.LOG_LEVEL });

/** Ensures the account behind an order exists in Cirrus, creating it when it is
 * missing and updating it when its data has drifted.
 *
 * The external system's id is stored as the account's `externalKey`, which is
 * what we use to detect whether it has already been synced.
 *
 * Returns the Cirrus account id, or `undefined` if it could not be resolved. */
export const ensureAccount = async (
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
