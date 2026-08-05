import { syncOrders } from "./application";
import config from "./config";
import { createWinstonLogger } from "./logger";

export const startApp = () => {
  const logger = createWinstonLogger({
    level: config.LOG_LEVEL,
  });

  // Here the app implementation should be done
  // on how it interacts with your system
  //
  // Some common solutions are:
  // - Listen for webhooks or external events
  // - Run as a daemon/cron job that continuously pings your system to check for changes
  syncOrders();

  logger.info("Complete");
};
