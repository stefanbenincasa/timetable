export class Student {
	studentId: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;

  constructor(studentId: number, firstName: string, lastName: string, email: string, password: string) {
		this.studentId = studentId 
		this.firstName = firstName
		this.lastName = lastName 
		this.email = email 
		this.password = password
  }
}

