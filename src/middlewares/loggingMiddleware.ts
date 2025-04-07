import { Request, Response, NextFunction } from "express";
import { logger } from "../services/loggerService";
import { sanitizeRequestData } from "../utils/sanitizeRequestData";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  const sanitizedRequest = sanitizeRequestData(req);
  logger.info("Request received", sanitizedRequest);

  // const requestLog = {
  //   method: req.method,
  //   url: req.url,
  //   headers: req.headers,
  //   body: req.body,
  // };
  // logger.info("Request received", requestLog);



  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;
    const responseLog = {
      status: res.statusCode,
      body: sanitizeResponseBody(body),
      duration: `${duration}ms`,
    };
    logger.info("Response sent", responseLog);
    return originalSend.call(this, body);
  };

  next();
}

function sanitizeResponseBody(body: any): any {
  const sensitiveKeys = ["token", "accessToken", "refreshToken", "password"];
  try {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    if (typeof parsed === "object" && parsed !== null) {
      for (const key of sensitiveKeys) {
        if (parsed[key]) parsed[key] = "[MASKED]";
      }
      return parsed;
    }
  } catch (err) {
    // If body is not JSON, return as is
    return err;
  }

  return typeof body === "string" ? body : JSON.stringify(body);
}
