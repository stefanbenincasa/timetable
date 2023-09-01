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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../assets/config");
const express_1 = require("express");
const pg_1 = require("pg");
const router = (0, express_1.Router)();
const pgPool = new pg_1.Pool(config_1.databaseConfig);
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body, authenticated = false;
    const queryRes = yield pgPool.query("SELECT * FROM student WHERE $1;", [1]);
    console.log(queryRes.rows);
    res.send();
}));
exports.default = router;
