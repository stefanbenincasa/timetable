"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const CustomError_1 = require("../../domain/CustomError");
const PSQLStudentRepository_1 = require("../../infrastructure/PSQLStudentRepository");
const secure_1 = require("../controllers/secure");
const studentControllers = __importStar(require("../controllers/student"));
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, password } = req.body, newStudent;
    try {
        newStudent = yield studentControllers.insertNewStudent(new PSQLStudentRepository_1.PSQLStudentRepository(), firstName, lastName, email, password);
        req.session.studentId = newStudent.studentId;
        console.log('New session ID assigned', req.session.id);
        res.json(newStudent);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}));
router.get('/profile', secure_1.verifySession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let student;
    try {
        if (req.session.studentId) { // Narrowing for Student controller function
            student = yield studentControllers.readStudentById(new PSQLStudentRepository_1.PSQLStudentRepository(), req.session.studentId);
            res.json(student);
        }
        else {
            throw new CustomError_1.CustomError(500);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}));
// Requires column extraction
router.put('/update_account', secure_1.verifySession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.studentId) {
            yield studentControllers.updateStudent(new PSQLStudentRepository_1.PSQLStudentRepository(), req.session.studentId, { password: "3453" });
        }
        else {
            throw new CustomError_1.CustomError(400);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}));
router.delete('/delete_account/:delete_id', secure_1.verifySession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.studentId) {
            let sidForDeletion = req.params.delete_id;
            if (req.session.studentId != sidForDeletion) {
                console.log('Logged in User can not delete another User at this time.');
                throw new CustomError_1.CustomError(401);
            }
            yield studentControllers.deleteStudent(new PSQLStudentRepository_1.PSQLStudentRepository(), sidForDeletion);
            req.session.destroy(() => res.send());
        }
        else {
            throw new CustomError_1.CustomError(400);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}));
exports.default = router;
