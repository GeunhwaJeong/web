// lib/logger.ts

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LoggerOptions = {
  service: string;
};

class CustomLogger {
  private static instance: CustomLogger;

  private service: string;

  private constructor(options: LoggerOptions) {
    this.service = options.service;
  }

  public static getInstance(options: LoggerOptions): CustomLogger {
    if (!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger(options);
    }
    return CustomLogger.instance;
  }

  private log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const logEntry = JSON.stringify({
      message: `[${this.service}] ${message}`,
      level,
      ...meta,
    });

    switch (level) {
      case 'debug':
      case 'verbose':
      case 'info':
        console.log(logEntry);
        break;
      case 'warn':
        console.warn(logEntry);
        break;
      case 'error':
        console.error(logEntry);
        break;
      default:
        console.log(logEntry);
    }
  }

  public info(message: string, meta?: Record<string, unknown>) {
    this.log('info', message, meta);
  }

  public warn(message: string, meta?: Record<string, unknown>) {
    this.log('warn', message, meta);
  }

  public error(message: string, error: Error | unknown, meta?: Record<string, unknown>) {
    // Skip logging entirely during E2E tests to prevent noise from expected errors
    if (process.env.E2E_TEST === 'true') {
      return;
    }

    const e =
      error instanceof Error
        ? {
            name: error.name,
            cause: error.cause,
            message: error.message,
            stack: error.stack,
          }
        : {
            message: JSON.stringify(error),
          };

    if (error) {
      this.log('error', message, {
        ...meta,
        error: e,
      });
    } else {
      this.log('error', message, meta);
    }
  }

  public debug(message: string, meta?: Record<string, unknown>) {
    this.log('debug', message, meta);
  }

  public verbose(message: string, meta?: Record<string, unknown>) {
    this.log('verbose', message, meta);
  }
}

// Usage example
export const logger = CustomLogger.getInstance({
  service: 'base-org',
});
