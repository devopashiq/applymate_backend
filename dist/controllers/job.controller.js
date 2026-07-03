"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_service_1 = require("../services/job.service");
const errorHandler_1 = require("../middleware/errorHandler");
class JobController {
    service = new job_service_1.JobService();
    create = async (req, res, next) => {
        try {
            const user = req.user;
            const data = { ...req.body, userId: user };
            if (!user) {
                throw new errorHandler_1.ExpressError("Unauthorized", 401);
            }
            const job = await this.service.create(data);
            res.success(job);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.JobController = JobController;
