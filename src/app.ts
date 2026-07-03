
import 'dotenv/config'; // Loads variables immediately
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { successHandler } from "./middleware/successHandler";
import jobRouter from "./routes/job.route";
import AuthRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
 // Must be before your routes

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(successHandler);

app.get("/health", (_req, res) => {
  res.success({ timestamp: new Date() });
});





app.use('/api/jobs',jobRouter)
app.use('/api/auth',AuthRouter)

app.use(errorHandler);

export default app;

