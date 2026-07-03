import z from "zod";
import { createJobSchema, updateJobSchema } from "../dtos/job.dto";
import { JobDocument } from "../models/jobs.model";
import { Types } from "mongoose";


export type CreateJobRequest = z.infer<typeof createJobSchema> & {
  userId: Types.ObjectId;
};

export type UpdateJobRequest = z.infer<typeof updateJobSchema> & {
  userId: Types.ObjectId;
};

export type JobEntity = JobDocument & { _id: Types.ObjectId };

export interface JobResponse {
  id: string;
  company: string;
  position: string;
  description: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  userId: string;
  createdAt: string;
  updatedAt: string;
}
