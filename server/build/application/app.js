"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./routes/index"));
const student_1 = __importDefault(require("./routes/student"));
// Init
const app = (0, express_1.default)();
const port = 5000;
app.set('trust proxy', 1);
// Mounting
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use((0, express_session_1.default)({
    secret: '06d2d0aa-4233-11ee-aa08-80fa5b895e5e',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 900000, sameSite: true }
}));
app.use('/', index_1.default);
app.use('/student', student_1.default);
// Other
app.listen(port, () => {
    let output = "Server is " +
        "running at http://localhost:" +
        port;
    console.log(output);
});
// Error Handling
app.use(function errorHandler(error, req, res, next) {
    console.log('Path: ', req.path);
    console.error('Error: ', error);
    if (error.kind === 'bad request') {
        res.status(400).send(error);
    }
    else if (error.kind === 'unauthorized') {
        res.status(401).send(error);
    }
    else if (error.kind === 'not found') {
        res.status(404).send(error);
    }
    else if (!error.kind) {
        res.status(500).send(error);
    }
});
