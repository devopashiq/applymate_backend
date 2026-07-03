"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const jobs_model_1 = __importDefault(require("../models/jobs.model"));
class JobRepository {
    async findById(id, userId) {
        return jobs_model_1.default.findOne({ _id: id, userId }).exec();
    }
    async findbyUserId(userId) {
        return jobs_model_1.default.find({ userId }).exec();
    }
    async create(job) {
        return await jobs_model_1.default.create(job);
    }
    async update(updatedData, id, userId) {
        return jobs_model_1.default.findOneAndUpdate({ _id: id, userId }, {
            $set: updatedData,
        }, {
            new: true,
            runValidators: true,
        }).exec();
    }
    async delete(id, userId) {
        return jobs_model_1.default.findOneAndDelete({
            _id: id,
            userId,
        }).exec();
    }
}
exports.JobRepository = JobRepository;
