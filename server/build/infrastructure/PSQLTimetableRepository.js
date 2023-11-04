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
exports.PSQLTimetableRepository = void 0;
const Timetable_1 = require("../domain/Timetable");
const Class_1 = require("../domain/Class");
const pg_1 = require("pg");
const config_1 = require("../assets/config");
const pgPool = new pg_1.Pool(config_1.databaseConfig);
class PSQLTimetableRepository {
    readTimetable(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timetable, classes, queryRes = yield pgPool.query(`
			SELECT 
				*
			FROM 
				student s 
			INNER JOIN 
				timetable t ON s.student_id = t.student_id
			INNER JOIN 
				class c ON c.class_id = t.class_id
			INNER JOIN 
				subject sub ON sub.subject_id = c.subject_id
			WHERE 
				s.student_id = $1;
		`, [studentId]);
            console.log(queryRes.rows);
            classes = queryRes.rows.map(row => new Class_1.Class(row.class_id, row.teacher, row.date_time, row.duration_minutes, row.subject_id, row.max_students, row.location));
            timetable = new Timetable_1.Timetable(studentId, classes);
            return timetable;
        });
    }
}
exports.PSQLTimetableRepository = PSQLTimetableRepository;
