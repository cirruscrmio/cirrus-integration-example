import { Code, ConnectError, type Interceptor } from "@connectrpc/connect";
import { ZodError } from "zod";

import type { LoggerPort } from "~/application/ports";
import { createTimer } from "~/utils";

interface ConnectRpcLoggingInterceptorDeps {
  logger: LoggerPort;
}

export const createConnectRpcLoggingInterceptor =
  ({ logger }: ConnectRpcLoggingInterceptorDeps): Interceptor =>
  (next) =>
  async (req) => {
    const timer = createTimer();

    try {
      const res = await next(req);
      const reqMeta: Record<string, unknown> = {
        duration: timer.stop().durationInMs,
        method: res.method.name,
        service: req.service.name,
        ...res.trailer.toJSON(),
      };

      logger.info("Request completed", reqMeta);

      return res;
    } catch (error) {
      if (error instanceof ConnectError) {
        logger.error("Request failed", {
          code: Code[error.code].toString(),
          errorMessage: error.rawMessage,
          duration: timer.stop().durationInMs,
          method: req.method.name,
          service: req.service.name,
        });

        throw error;
      }

      if (error instanceof ZodError) {
        const msg = error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");

        logger.error("Request failed due to validation", {
          error: msg,
          duration: timer.stop().durationInMs,
          method: req.method.name,
          service: req.service.name,
          trace: error.stack,
        });

        throw new ConnectError(`Invalid request: ${msg}`, Code.InvalidArgument);
      }

      logger.error("Request failed due to internal error", {
        error,
        duration: timer.stop().durationInMs,
        method: req.method.name,
        service: req.service.name,
      });

      throw error;
    }
  };
