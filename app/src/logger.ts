import winston from "winston";

import config from "~/config";

const IS_PRODUCTION = config.NODE_ENV === "production";

interface CreateWinstonLoggerOptions {
  level: string;
  transports?: winston.transport[];
}

/**
 * Create Winston logger with different formats based on environment.
 */
export const createWinstonLogger = (options: CreateWinstonLoggerOptions) => {
  return new winston.Logger({
    ...options,
    isProduction: IS_PRODUCTION,
  });
};
