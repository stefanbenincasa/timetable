"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("../assets/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const timetable_1 = __importDefault(require("./routes/timetable"));
// Initialisation
const port = 5000;
const pgStore = (0, connect_pg_simple_1.default)(express_session_1.default);
const app = (0, express_1.default)();
const pgPool = new pg_1.Pool(config_1.databaseConfig);
app.set('trust proxy', 1);
app.set('env', 'development');
// Mounting
app.use((0, express_session_1.default)({
    secret: '06d2d0aa-4233-11ee-aa08-80fa5b895e5e',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: app.get('env') === 'development' ? false : true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: true,
        httpOnly: true
    },
    store: new pgStore({
        pool: pgPool,
        createTableIfMissing: true
    })
}));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use('/', index_1.default);
app.use('/timetable', timetable_1.default);
// Listeners
app.listen(port, () => {
    let output = "Server is " +
        "running at http://localhost:" +
        port;
    console.log(output);
});
pgPool.on('error', (err, client) => {
    console.error('Unexpected error on database pool. Exiting application.', err);
    process.exit(-1);
});
// Error Handling
app.use(function errorHandler(error, req, res, next) {
    console.log('Path: ', req.path);
    console.error('Error: ', error);
    if (error.kind === 400) {
        res.status(400).send(error);
    }
    else if (error.kind === 401) {
        res.status(401).send(error);
    }
    else if (error.kind === 404) {
        res.status(404).send(error);
    }
    else if (error.kind === 500) {
        res.status(500).send(error);
    }
});
