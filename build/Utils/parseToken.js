"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseToken = (req) => {
    var _a;
    let authToken = null;
    const cookies = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split(';');
    console.log(cookies);
    if (cookies) {
        cookies.forEach((cookie) => {
            if (cookie.trim().startsWith('Authorization')) {
                authToken = cookie.split('=')[1];
            }
        });
    }
    return authToken;
};
exports.default = parseToken;
