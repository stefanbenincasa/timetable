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
const pg_1 = require("pg");
const config_1 = require("../assets/config");
const pgPool = new pg_1.Pool(config_1.databaseConfig);
class PSQLStudentRepository {
    storeNew(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRes = yield pgPool.query('INSERT INTO student(first_name, last_name, email, password VALUES ($1,$2,$3,$4);', [student.firstName, student.lastName, student.email, student.password]);
            if (!queryRes || queryRes.rows.length === 0)
                throw new CustomError_1.CustomError(500);
            console.log('New Student created!');
        });
    }
    storeExisting(student) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Student updated!');
        });
    }
}
exports.PSQLStudentRepository = PSQLStudentRepository;
