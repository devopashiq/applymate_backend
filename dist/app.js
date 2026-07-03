"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Loads variables immediately
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const successHandler_1 = require("./middleware/successHandler");
const job_route_1 = __importDefault(require("./routes/job.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(successHandler_1.successHandler);
app.get("/health", (_req, res) => {
    res.success({ timestamp: new Date() });
});
app.use('/api/jobs', job_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
