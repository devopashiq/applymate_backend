"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ExpressError = void 0;
class ExpressError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ExpressError = ExpressError;
const errorHandler = (err, req, res, next) => {
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
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
};
exports.errorHandler = errorHandler;
