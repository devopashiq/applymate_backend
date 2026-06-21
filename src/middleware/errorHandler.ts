import { Request, Response, NextFunction } from "express";

export class ExpressError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = err instanceof ExpressError ? err : null;
  const isStandardError = err instanceof Error;

  const message = isStandardError ? err.message : "Internal server error";
  const stack = isStandardError ? err.stack : undefined;
  const statusCode = error?.statusCode ?? 500;

  console.error({ message, stack });

  if (error?.isOperational) {
    res.status(statusCode).json({
      status: "error",
      message,
      ...(process.env.NODE_ENV === "development" && { stack }),
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};