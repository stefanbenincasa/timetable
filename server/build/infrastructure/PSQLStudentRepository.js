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
exports.PSQLStudentRepository = void 0;
const CustomError_1 = require("../domain/CustomError");
const Student_1 = require("../domain/Student");
const pg_1 = require("pg");
const config_1 = require("../assets/config");
const pgPool = new pg_1.Pool(config_1.databaseConfig);
class PSQLStudentRepository {
    storeNew(student) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryRes = yield pgPool.query(`INSERT INTO student(first_name, last_name, email, password) VALUES(LOWER($1),
			 LOWER($2), $3, $4) RETURNING *;`, [student.firstName, student.lastName, student.email, student.password]);
            if (!queryRes || queryRes.rows.length === 0)
                throw new CustomError_1.CustomError(500);
            console.log('New Student created!');
            let newStudent = new Student_1.Student(queryRes.rows[0].student_id, queryRes.rows[0].first_name, queryRes.rows[0].last_name, queryRes.rows[0].email, queryRes.rows[0].password);
            return newStudent;
        });
    }
    readStudentById(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryRes = yield pgPool.query(`SELECT student_id, first_name, last_name, 
			email, password FROM student WHERE student_id = $1;`, [studentId]);
            if (!queryRes || queryRes.rows.length === 0)
                throw new CustomError_1.CustomError(500);
            console.log('Student found. Returning to Client.');
            let student = new Student_1.Student(queryRes.rows[0].student_id, queryRes.rows[0].first_name, queryRes.rows[0].last_name, queryRes.rows[0].email, queryRes.rows[0].password);
            return student;
        });
    }
    readStudentByEmailPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryRes = yield pgPool.query(`SELECT student_id, first_name, last_name, email, password FROM student WHERE email = $1 AND password = $2;`, [email, password]);
            if (!queryRes || queryRes.rows.length === 0)
                throw new CustomError_1.CustomError(500);
            console.log('Student found. Returning to Client.');
            let student = new Student_1.Student(queryRes.rows[0].student_id, queryRes.rows[0].first_name, queryRes.rows[0].last_name, queryRes.rows[0].email, queryRes.rows[0].password);
            return student;
        });
    }
    deleteStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryRes = yield pgPool.query('DELETE FROM student WHERE student_id = $1;', [studentId]);
            queryRes = yield pgPool.query('SELECT * FROM student WHERE student_id = $1;', [studentId]);
            if (!queryRes || queryRes.rows.length > 0)
                throw new CustomError_1.CustomError(500);
            console.log('Student deleted. Returning to Client...');
        });
    }
}
exports.PSQLStudentRepository = PSQLStudentRepository;
