export class Class {
	classId: number;
	teacher: string;
	dateTime: string;
	durationMinutes: number;
	subjectId: number;

	maxStudents?: number;
	location?: string;

  constructor(classId: number, teacher: string, dateTime: string, durationMinutes: number, subjectId: number, location?: string, maxStudents?: number) {
		this.classId = classId 
		this.teacher = teacher 
		this.dateTime = dateTime 
		this.durationMinutes = durationMinutes
		this.subjectId = subjectId 

		this.location = location 
		this.maxStudents = maxStudents 
  }
}

