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
const express_1 = require("express");
const pg_1 = require("pg");
const secure_1 = require("../controllers/secure");
const config_1 = require("../../assets/config");
const pgPool = new pg_1.Pool(config_1.databaseConfig);
const router = (0, express_1.Router)();
// Remember to hash passwords
router.post('/signup', secure_1.verifySession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, password } = req.body, q = '', student;
    q = `INSERT INTO student(first_name, last_name, email, password) 
	VALUES(LOWER($1), LOWER($2), $3, $4);`;
    try {
        const queryRes = yield pgPool.query(q, [firstName, lastName, email, password]);
        console.log('New Student created!');
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.send();
}));
router.get('/profile', (req, res) => {
    res.send('Student route');
});
router.put('/update_account', (req, res) => {
    res.send();
});
router.delete('/delete_account', (req, res) => {
    res.send();
});
exports.default = router;
