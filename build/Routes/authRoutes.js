"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/google', passport_1.default.authenticate('google', { scope: ['public_profile', 'email'] }));
const authRoute = router;
exports.default = authRoute;
