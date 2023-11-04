import { Student } from './Student'

export interface StudentRepository {
	storeNew(student: Student): Promise<Student>;
	readStudentById(studentId: number): Promise<Student>;
	readStudentByEmailPassword(email: string, password: string): Promise<Student>;
	deleteStudent(studentId: number): Promise<void>;
}

