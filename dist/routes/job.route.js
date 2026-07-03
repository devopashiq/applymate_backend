"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const jobRouter = (0, express_1.Router)();
const controller = new job_controller_1.JobController();
jobRouter.route('/').post(controller.create);
exports.default = jobRouter;
