"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createSendToken = (user, res) => {
    try {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const time = parseInt(process.env.JWT_COOKIE_EXPIRES_IN);
        const cookieOptions = {
            expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        if (process.env.NODE_ENV === 'production')
            cookieOptions.httpOnly = true;
        res.cookie('Authorization', token, cookieOptions);
        return res.status(200).json(Object.assign(Object.assign({}, user._doc), { token }));
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.default = createSendToken;
