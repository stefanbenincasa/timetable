export class Student {
	studentId: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;

  constructor(studentId: number, first_name: string, last_name: string, email: string, password: string) {
		this.studentId = studentId 
		this.first_name = first_name 
		this.last_name = last_name 
		this.email = email 
		this.password = password
  }
}

