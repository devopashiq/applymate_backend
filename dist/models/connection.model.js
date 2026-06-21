"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactMethodSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["linkedin", "email", "phone", "github", "twitter"],
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
}, { _id: false });
const connectionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contactMethods: {
        type: [contactMethodSchema],
        default: [],
    },
}, {
    timestamps: true,
});
const ConnectionModel = mongoose_1.default.model("Connection", connectionSchema);
exports.default = ConnectionModel;
