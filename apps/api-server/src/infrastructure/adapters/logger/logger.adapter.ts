import winston from "winston";

import * as logger from "@cirruscrmio/common/logger";

import type { LoggerPort } from "~/application/ports";
import config from "~/config";

const IS_PRODUCTION = config.NODE_ENV === "production";

interface CreateWinstonLoggerOptions {
  level: string;
  transports?: winston.transport[];
}

/**
 * Create Winston logger with different formats based on environment.
 */
export const createWinstonLogger = (
  options: CreateWinstonLoggerOptions,
): LoggerPort => {
  return logger.createWinstonLogger({
    ...options,
    isProduction: IS_PRODUCTION,
  });
};
