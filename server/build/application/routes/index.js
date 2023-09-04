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
const CustomError_1 = require("../../domain/CustomError");
const secure_1 = require("../controllers/secure");
const router = (0, express_1.Router)();
const pgPool = new pg_1.Pool(config_1.databaseConfig);
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body, student;
    try {
        if (!req.session.studentId) {
            const queryRes = yield pgPool.query('SELECT * FROM student WHERE email = $1 AND password = $2;', [email, password]);
            if (!queryRes.rows)
                throw new CustomError_1.CustomError(500);
            student = queryRes.rows.find(row => row.email === email && row.password === password);
            if (!student) {
                res.status(401);
                res.redirect('/signup');
            }
            req.session.studentId = student.student_id;
            console.log('New session ID assigned', req.session.id);
        }
        else {
            console.log('Redirecting to Home Page...');
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    res.send();
}));
// Should display timetable for the current logged in, else redirect to 'login'
router.get('/', secure_1.verifySession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let studentId = req.session.studentId, query = '', timetable;
    // Get the timetable object of the current student
    query = `
		SELECT *
		FROM student s 
		INNER JOIN timetable t ON s.student_id = t.student_id
		INNER JOIN class c ON c.class_id = t.class_id
		WHERE s.student_id = $1;
	`;
    // Set the Timetable object using query response, if any
    const queryRes = yield pgPool.query(query, [studentId]);
    res.send();
}));
exports.default = router;
