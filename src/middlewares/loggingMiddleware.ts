import { Request, Response, NextFunction } from "express";
import { logger } from "../services/loggerService";
import { sanitizeRequestData } from "../utils/sanitizeRequestData";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  const requestLog = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  };
  logger.info("Request received", requestLog);

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;
    const responseLog = {
      status: res.statusCode,
      body: typeof body === "string" ? body : JSON.stringify(body),
      duration: `${duration}ms`,
    };
    logger.info("Response sent", responseLog);
    return originalSend.call(this, body);
  };

  next();
}
