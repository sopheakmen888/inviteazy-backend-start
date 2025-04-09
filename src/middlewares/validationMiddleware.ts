import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "public", "tourist"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

const InviteeSchema = z.object({
  event_id: z.string(),
  user_id: z.string(),
  status: z.enum(["pending", "accept", "maybe", "no", "busy"]),
  qr_code: z.string(),
  is_checked_in: z.boolean().optional(),
  checked_in_at: z.date().optional(),
  created_at: z.date().optional(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateInvitee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    InviteeSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};
