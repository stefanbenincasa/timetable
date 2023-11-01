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
exports.deleteStudent = exports.readStudentByEmailPassword = exports.readStudentById = exports.insertNewStudent = void 0;
const Student_1 = require("../../domain/Student");
function insertNewStudent(studentRepository, firstName, lastName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const newStudent = new Student_1.Student(0, firstName, lastName, email, password);
        const createdStudent = yield studentRepository.storeNew(newStudent);
        return createdStudent;
    });
}
exports.insertNewStudent = insertNewStudent;
function readStudentById(studentRepository, studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield studentRepository.readStudentById(studentId);
        return existingStudent;
    });
}
exports.readStudentById = readStudentById;
function readStudentByEmailPassword(studentRepository, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield studentRepository.readStudentByEmailPassword(email, password);
        return existingStudent;
    });
}
exports.readStudentByEmailPassword = readStudentByEmailPassword;
function deleteStudent(studentRepository, studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield studentRepository.deleteStudent(studentId);
    });
}
exports.deleteStudent = deleteStudent;
