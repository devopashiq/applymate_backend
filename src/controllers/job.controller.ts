import { NextFunction, Response, Request } from "express";
import { JobService } from "../services/job.service";
import { ExpressError } from "../middleware/errorHandler";

export class JobController {
  private service = new JobService();
  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = req.user;
      const data ={...req.body,userId:user}

      if (!user) {
        throw new ExpressError("Unauthorized", 401);
      }

      const job = await this.service.create(data);

      res.success(job);
    } catch (error) {
      next(error);
    }
  };
}
