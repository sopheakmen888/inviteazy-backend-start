import winston, { Logger } from "winston";

declare module "winston" {
  interface TransformableInfo {
    metadata: Record<string, any>;
  }
}

export class LoggerService {
  private logger: Logger;
  private level: "debug" | "info" =
    process.env.NODE_ENV === "development" ? "debug" : "info";

  constructor() {
    this.logger = winston.createLogger({
      level: this.level,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json(),
        winston.format.printf((info) => {
          const { timestamp, level, message, ...metadata } = info;

          const metadataStr = Object.keys(metadata).length
            ? ` ${JSON.stringify(metadata, null, 2)}`
            : "";

          return `${timestamp} [${level.toUpperCase()}]: ${message}${metadataStr}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
      ],
    });
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }
}

// Singleton instance
export const logger: LoggerService = new LoggerService();
