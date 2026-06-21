"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successHandler = void 0;
const successHandler = (req, res, next) => {
    res.success = (data, message = '') => {
        res.status(200).json({
            status: "success",
            data: data,
            message: message,
        });
    };
    next();
};
exports.successHandler = successHandler;
