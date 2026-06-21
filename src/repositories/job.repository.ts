import { CreateJobDTO, UpdateJobDTO } from "../dtos/job.dto";
import JobModel, { JobDocument } from "../models/jobs.model";
import { Types } from "mongoose";

type CreateJobData = CreateJobDTO & {
  userId: Types.ObjectId;
};

export class JobRepository {

  async findById(id: string, userId: string): Promise<JobDocument | null> {
    return JobModel.findOne({ _id: id, userId }).exec();
  }

  async findbyUserId(userId: string): Promise<JobDocument[]> {
    return JobModel.find({ userId }).exec();
  }

  async create(job: CreateJobData): Promise<JobDocument> {
    return JobModel.create(job);
  }

  async update(
    updatedData: UpdateJobDTO,
    id: string,
    userId: string,
  ): Promise<JobDocument | null> {
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

  async delete(id: string, userId: string): Promise<JobDocument |null> {
    return JobModel.findOneAndDelete({
      _id: id,
      userId,
    }).exec();
  }
}
