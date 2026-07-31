import { connectNodeAdapter } from "@connectrpc/connect-node";
import http from "node:http";

import config from "./config";
import { createFooAdapater } from "./infrastructure/adapters/foo/foo.adapter";
import { createWinstonLogger } from "./infrastructure/adapters/logger";
import { createConnectRpcInterceptors } from "./infrastructure/connectrpc/interceptors";
import { prometheus } from "./infrastructure/metrics";
import { createConnectRpcRouter } from "./presentation/connectrpc/router";
import { createHttpHandler } from "./presentation/http/router";

const GRACEFUL_TIMEOUT_MS = 10_000;

interface StartAppProps {
  port: number;
}

export const startApp = ({ port }: StartAppProps) => {
  const logger = createWinstonLogger({
    level: config.LOG_LEVEL,
  });

  const deps = {
    foo: createFooAdapater(),
    logger,
  };

  const rpcHandler = connectNodeAdapter({
    routes: createConnectRpcRouter(deps),
    interceptors: createConnectRpcInterceptors(deps),
  });

  const httpHandler = createHttpHandler({
    getMetrics: () => prometheus.register.metrics(),
    rpcHandler,
  });

  const server = http.createServer(httpHandler);

  server.listen(port);

  logger.info(`Server running at http://localhost:${port}`);

  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);

    server.close((error) => {
      if (error) {
        logger.fatal("Error during server shutdown", { error });
        process.exit(1);
      }

      logger.info("HTTP server closed");
      process.exit(0);
    });

    // Safety net: force exit if something hangs
    setTimeout(() => {
      logger.fatal("Graceful shutdown timed out. Forcing exit.");
      process.exit(1);
    }, GRACEFUL_TIMEOUT_MS);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  return server;
};
