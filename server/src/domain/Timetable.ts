import { Class } from './Class'

export class Timetable {
	studentId: number;
	classes: Class[];

  constructor(studentId: number, classes: Class[]) {
		this.studentId = studentId
		this.classes = classes
  }
}

