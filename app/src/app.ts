import { createHttpServer } from "./application";
import config from "./config";
import { createWinstonLogger } from "./logger";

const GRACEFUL_TIMEOUT_MS = 10_000;

interface StartAppProps {
  port: number;
}

export const startApp = ({ port }: StartAppProps) => {
  const logger = createWinstonLogger({
    level: config.LOG_LEVEL,
  });

  const server = createHttpServer(config.PORT);

  logger.info(`Server running at http://localhost:${port}`);

  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);

    server
      .stop(true)
      .then(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      })
      .catch((error) => {
        logger.error("Error during server shutdown", { error });
        process.exit(1);
      });

    // Safety net: force exit if something hangs
    setTimeout(() => {
      logger.error("Graceful shutdown timed out. Forcing exit.");
      process.exit(1);
    }, GRACEFUL_TIMEOUT_MS);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  return server;
};
