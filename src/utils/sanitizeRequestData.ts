import express, { Request } from "express";

const sensitiveFields = ["username", "password", "email", "token"];

export function sanitizeRequestData(req: Request): Record<string, any> {
  const safeData: Record<string, any> = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  if (req.body && Object.keys(req.body).length > 0) {
    const { username, password, email, ...safeBody } = req.body;
    safeData.body = safeBody;
    sensitiveFields.forEach((field) => {
      if (req.body[field]) safeData.body[field] = "[MASKED]";
    });
  }

  if (req.cookies && req.cookies.sessionId) {
    safeData.cookies = { sessionId: "[MASKED]" };
  }

  return safeData;
}


