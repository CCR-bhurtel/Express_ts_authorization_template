"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorController {
    constructor() {
        this.controller = (err, req, res, next) => {
            if (req.originalUrl.startsWith('/api')) {
                return res.status(err.statusCode || 500).json({
                    status: err.status || 'error',
                    message: err.message,
                    stack: err.stack,
                    error: err,
                });
            }
            if (err.isOperational) {
                return res.status(err.statusCode).render('error', {
                    title: 'Something went wrong',
                    msg: err.message,
                });
            }
            else {
                return res.status(500).render('error', {
                    title: 'Something went wrong',
                    msg: err.message,
                });
            }
        };
    }
}
exports.default = ErrorController;
