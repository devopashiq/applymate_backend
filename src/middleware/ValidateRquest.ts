import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = schema.safeParse(data);
      if (!result.success) {
        const errors: Record<string, string[]> = {};

        for (const issues of result.error.issues) {
          console.log(issues);
          const field = issues.path.join(".");
          if (!errors[field]) {
            errors[field] = [];
          }

          errors[field].push(issues.message);
        }

        return res.status(400).json({
          message: "Validation failed",
          errors
        });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};
