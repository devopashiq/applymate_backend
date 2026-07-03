import mongoose from "mongoose";

const MONGODB_URI =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/job_log";



export const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (error:any) {
    console.error("Error connecting to database:", error);
  }
};
 