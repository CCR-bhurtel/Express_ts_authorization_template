"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../../Utils/AppError"));
class ErrorController {
    constructor() {
        this.handleCastErroDB = (err) => {
            const message = `Invalid ${err.path}: ${err.value}`;
            return new AppError_1.default(message, 400);
        };
        this.handleDuplicateFieldDB = (err) => {
            return new AppError_1.default('The email already exists, please use another', 400);
        };
        this.handleValidationErrorDB = (err) => {
            const errors = Object.values(err.errors).map((el) => el.message);
            const message = `Invalid input data, ${errors[0]}`; // returning first validation error only
            return new AppError_1.default(message, 400);
        };
        this.handleJWTError = (err) => new AppError_1.default('Invalid Token, please login again', 401);
        this.handleTokenExpireError = (err) => new AppError_1.default('Session Expired, please login again', 401);
        this.sendProdError = (err, req, res) => {
            if (req.originalUrl.startsWith('/api')) {
                if (err.isOperational) {
                    return res.status(err.statusCode).json({
                        status: err.status || 'error',
                        message: err.message,
                    });
                }
                return res.status(500).json({
                    status: 'error',
                    message: 'Something went wrong',
                });
            }
            else {
                let msg = undefined;
                if (!err.isOperational)
                    msg = 'Please try again later';
                return res.status(err.statusCode).render('error', {
                    title: 'something went wrong',
                    msg: msg || err.message,
                });
            }
        };
        this.controller = (err, req, res, next) => {
            let error = null;
            if (err.name === 'CastError' || err.kind === 'ObjectId')
                error = this.handleCastErroDB(err);
            if (err.code === 11000)
                error = this.handleDuplicateFieldDB(err);
            if (err.name === 'ValidationError')
                error = this.handleValidationErrorDB(err);
            if (err.name === 'JsonWebTokenError')
                error = this.handleJWTError(err);
            if (err.name === 'TokenExpiredError')
                error = this.handleTokenExpireError(err);
            this.sendProdError(error || err, req, res);
        };
    }
}
exports.default = ErrorController;
