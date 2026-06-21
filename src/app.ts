import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { successHandler } from "./middleware/successHandler";
import jobRouter from "./routes/job.route";

const app = express();
app.use(express.json());

app.use(successHandler);

app.get("/health", (_req, res) => {
  res.success({ timestamp: new Date() });
});





app.use('/api/jobs',jobRouter)

app.use(errorHandler);

export default app;
