import { Student } from './Student'

export interface StudentRepository {
	storeNew(student: Student): Promise<Student>;
	readStudentById(studentId: number): Promise<Student>;
	readStudentByEmailPassword(email: string, password: string): Promise<Student>;
	// updateStudent(studentId: number, columns: any[]): Promise<Student>;
	deleteStudent(studentId: number): Promise<void>;
}

