"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(error.stack);
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: error.message
    });
};
exports.errorHandler = errorHandler;
