"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const job_repository_1 = require("../repositories/job.repository");
class JobService {
    repo = new job_repository_1.JobRepository();
    async create(data) {
        const job = await this.repo.create(data);
        return job;
    }
}
exports.JobService = JobService;
