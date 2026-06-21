"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Applied",
        enum: ["Applied", "Interview", "Offer", "Rejected"]
    },
    //,
    // connections:{
    //     type:[mongoose.Schema.Types.ObjectId],
    //     ref:"Connection",
    //     defalut: []
    // },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});
const JobModel = mongoose_1.default.model("Job", jobSchema);
exports.default = JobModel;
