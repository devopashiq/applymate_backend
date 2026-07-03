
import JobModel from "../models/jobs.model";
import { Types } from "mongoose";
import { CreateJobRequest, JobEntity, UpdateJobRequest } from "../types/job.type";


export class JobRepository {

  async findById(id: string, userId: string): Promise<JobEntity | null> {
    return JobModel.findOne({ _id: id, userId }).exec();
  }

  async findbyUserId(userId: string): Promise<JobEntity[]> {
    return JobModel.find({ userId }).exec();
  }

  async create(job: CreateJobRequest): Promise<JobEntity> {
    return await JobModel.create(job);
  }

  async update(
    updatedData: UpdateJobRequest,
    id: string,
    userId: string,
  ): Promise<JobEntity | null> {
    return JobModel.findOneAndUpdate(
      { _id: id, userId },
      {
        $set: updatedData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async delete(id: string, userId: string): Promise<JobEntity |null> {
    return JobModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}
