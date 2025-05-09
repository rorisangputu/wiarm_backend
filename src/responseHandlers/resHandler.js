"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
//Standardized response func
const handleResponse = (res, status, message, data) => {
    res.status(status).json({
        status,
        message,
        data
    });
};
exports.handleResponse = handleResponse;
