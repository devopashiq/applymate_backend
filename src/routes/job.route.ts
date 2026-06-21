import {Router } from "express";
import { JobController } from "../controllers/job.controller";


const jobRouter = Router();
const controller = new JobController()



jobRouter.route('/').post(controller.create)


export default jobRouter