// mappers/job.mapper.ts
import { JobEntity, JobResponse } from "../types/job.type";

export function toJobResponse(entity: JobEntity): JobResponse {
  return {
    id: entity._id.toString(),
    company: entity.company,
    position: entity.position,
    description: entity.description,
    status: entity.status,
    userId: entity.userId.toString(),
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}