import { syncExternalOrders } from "./application";
import type { ExternalOrder } from "./application/types";
import config from "./config";
import { createWinstonLogger } from "./logger";

// Example set of orders to sync. In a real integration these would be fetched
// from your own system rather than hard-coded.
const externalOrders: ExternalOrder[] = [
  {
    externalId: "order-1001",
    account: { externalId: "account-42", name: "Acme Inc" },
    contact: {
      externalId: "contact-7",
      firstName: "Ada",
      lastName: "Lovelace",
    },
  },
];

export const startApp = async () => {
  const logger = createWinstonLogger({
    level: config.LOG_LEVEL,
  });

  // Here the app implementation should be done
  // on how it interacts with your system
  //
  // Some common solutions are:
  // - Listen for webhooks or external events
  // - Run as a daemon/cron job that continuously pings your system to check for changes
  await syncExternalOrders(externalOrders);

  logger.info("Complete");
};
