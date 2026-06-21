"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
(0, db_1.connectDb)()
    .then(() => {
    console.log("Database connection successful");
    app_1.default.listen(3000, () => {
        console.log("Server is running on port 3000", "http://localhost:3000");
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
});
