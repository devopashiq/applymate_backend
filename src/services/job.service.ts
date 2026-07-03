import { Types } from "mongoose";

import { JobDocument } from "../models/jobs.model";
import { JobRepository } from "../repositories/job.repository";
import { CreateJobRequest, JobEntity, JobResponse } from "../types/job.type";

export class JobService {
  private repo = new JobRepository();

  async create(data: CreateJobRequest): Promise<JobEntity> {
    const job = await this.repo.create(data);

    return job;
  }
}
