"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
class Class {
    constructor(classId, teacher, dateTime, subjectId, location, maxStudents) {
        this.classId = classId;
        this.teacher = teacher;
        this.dateTime = dateTime;
        this.subjectId = subjectId;
        this.location = location;
        this.maxStudents = maxStudents;
    }
}
exports.Class = Class;