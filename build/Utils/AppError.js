"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = this.statusCode.toString().startsWith('4') ? 'fail' : 'error';
    }
}
exports.default = AppError;
