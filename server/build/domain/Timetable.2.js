"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
class Timetable {
    constructor(classId, teacher, dateTime, subjectId, location, maxStudents) {
        this.classId = classId;
        this.teacher = teacher;
        this.dateTime = dateTime;
        this.subjectId = subjectId;
        this.location = location;
        this.maxStudents = maxStudents;
    }
}
exports.Timetable = Timetable;
