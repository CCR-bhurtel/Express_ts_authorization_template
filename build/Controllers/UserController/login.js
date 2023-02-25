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
const User_1 = __importDefault(require("../../Model/User"));
const AppError_1 = __importDefault(require("../../Utils/AppError"));
const catchAsync_1 = __importDefault(require("../../Utils/catchAsync"));
const CreateSendToken_1 = __importDefault(require("../../Utils/CreateSendToken"));
const login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Please fill in all the fields' });
    const user = yield User_1.default.findOne({ email }).select(['+password']);
    if (!user) {
        return next(new AppError_1.default('No user found with given email, please signup', 400));
    }
    if (yield user.comparePassword(password, user.password))
        (0, CreateSendToken_1.default)(user, res);
    else {
        return next(new AppError_1.default('Incorrect credentials', 400));
    }
}));
exports.default = login;
