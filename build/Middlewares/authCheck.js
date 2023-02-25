"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseToken_1 = __importDefault(require("../Utils/parseToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Model/User"));
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = (0, parseToken_1.default)(req);
    if (!authToken) {
        return res.status(403).json({ message: 'Error authenticating' });
    }
    if (authToken) {
        const decodedPayload = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET);
        const user = yield User_1.default.findById(decodedPayload.id);
        req.user = user;
        next();
    }
});
exports.default = authCheck;
