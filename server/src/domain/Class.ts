export class Class {
	classId: number;
	teacher: string;
	dateTime: string;
	durationMinutes: number;
	subject: string;

	maxStudents?: number;
	location?: string;

  constructor(classId: number, teacher: string, dateTime: string, durationMinutes: number, subject: string, location?: string, maxStudents?: number) {
		this.classId = classId 
		this.teacher = teacher 
		this.dateTime = dateTime 
		this.durationMinutes = durationMinutes
		this.subject = subject

		this.location = location 
		this.maxStudents = maxStudents 
  }
}

