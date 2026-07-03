import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { RefreshTokenPayload } from "../types/auth.type";
import { ExpressError } from "./errorHandler";

const secret = process.env.JWT_SECRET_ACCESS;
if (!secret) {
  throw new Error("No Secret Provied for  Token");
}
export const isLoggedUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("Authorization");
 
  if (!authHeader) {
   return next(new ExpressError("Authorization header is required", 401));
   
  }
  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
     return next(
      new ExpressError("Invalid authorization header format", 401),
    );
  }

  try {
    const token = parts[1];
    const payload = jwt.verify(token, secret) as RefreshTokenPayload;
    req.user = payload;

    next();
  } catch (err) {
     if (err instanceof TokenExpiredError) {
      return next(new ExpressError("Access token expired", 401));
    }

    if (err instanceof JsonWebTokenError) {
      return next(new ExpressError("Invalid access token", 401));
    }

    next(err);
  
  }
};
