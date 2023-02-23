"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../Controllers/UserController/login"));
const authCheck_1 = __importDefault(require("../Middlewares/authCheck"));
const signup_1 = __importDefault(require("../Controllers/UserController/signup"));
const userRoutes = express_1.default.Router();
userRoutes.post('/signup', signup_1.default);
userRoutes.post('/login', login_1.default);
userRoutes.get('/', authCheck_1.default);
exports.default = userRoutes;
