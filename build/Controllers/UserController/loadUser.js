"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadUser = (req, res) => {
    res.status(200).json({
        user: req === null || req === void 0 ? void 0 : req.user,
    });
};
exports.default = loadUser;
