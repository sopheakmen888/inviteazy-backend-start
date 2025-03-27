import { Request, Response, NextFunction } from "express";
import { logger } from "../services/loggerService";

interface CustomError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  console.error(`[${req.method}] ${req.path} - Error: ${message}`);
  logger.error("Error occurred", {
    method: req.method,
    url: req.url,
    status,
    message,
    stack: err.stack,
  });

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
  });
};
