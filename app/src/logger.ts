import winston from "winston";

interface CreateWinstonLoggerOptions {
  level: string;
}

/**
 * Create Winston logger with different formats based on environment.
 */
export const createWinstonLogger = (options: CreateWinstonLoggerOptions) => {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
    ...options,
  });
};
