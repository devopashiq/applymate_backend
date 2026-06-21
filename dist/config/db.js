"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/job_log";
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log("Database connected");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
};
exports.connectDb = connectDb;
