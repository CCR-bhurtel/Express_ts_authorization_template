"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const path_1 = __importDefault(require("path"));
const DevErrorController_1 = __importDefault(require("./Controllers/ErrorControllers/DevErrorController"));
const ProdErrorController_1 = __importDefault(require("./Controllers/ErrorControllers/ProdErrorController"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json({}));
app.use((0, cookie_session_1.default)({
    maxAge: 5 * 24 * 60 * 60,
    keys: [process.env.cookieKey],
}));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('view engine', 'pug');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.get('/', (req, res) => {
    res.render('dashboard.pug');
});
if (process.env.NODE_ENV === 'development') {
    app.use(new DevErrorController_1.default().controller);
}
else {
    app.use(new ProdErrorController_1.default().controller);
}
exports.default = app;
