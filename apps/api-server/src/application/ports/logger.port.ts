/** A logger using log levels based on OpenTelemetry conventions */
export interface LoggerPort {
  /** Logs a message about normal operations. */
  info(message: string, meta?: Record<string, unknown>): void;

  /** Logs an error that prohibits an operation from
   * being carried out. Application can still continue
   * to run normally. */
  error(message: string, meta?: Record<string, unknown>): void;

  /** Logs an error that prohibits the application
   * from running normally. */
  fatal(message: string, meta?: Record<string, unknown>): void;

  /** Logs warning that an operation or the system as
   * whole has encountered unexpected or unusual conditions but
   * can still proceed normally. */
  warn(message: string, meta?: Record<string, unknown>): void;

  /** Logs a message about normal operations that used to
   * debug the behavior of the system. */
  debug(message: string, meta?: Record<string, unknown>): void;

  /** Logs a message about normal operations that used to
   * debug the behavior of the system in detail. */
  trace(message: string, meta?: Record<string, unknown>): void;
}
