"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const mongoose_1 = require("mongoose");
const job_repository_1 = require("../repositories/job.repository");
class JobService {
    repo = new job_repository_1.JobRepository();
    async create(userId, data) {
        const job = await this.repo.create({
            userId: new mongoose_1.Types.ObjectId(userId),
            ...data,
        });
    }
}
exports.JobService = JobService;
