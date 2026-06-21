import { Types } from "mongoose";
import { CreateJobDTO } from "../dtos/job.dto";
import { JobDocument } from "../models/jobs.model";
import { JobRepository } from "../repositories/job.repository";

export class JobService {
  private repo = new JobRepository();

  async create(userId: string, data: CreateJobDTO): Promise<JobDocument> {
    const job = await this.repo.create({
        userId:new Types.ObjectId(userId),
        ...data
    });


    return job
  }
}
