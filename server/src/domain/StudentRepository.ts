import { Student } from './Student'

export interface StudentRepository {
	storeNew(student: Student): Promise<Student>;
	readStudentById(studentId: number): Promise<Student | null>;
	readStudentByEmailPassword(email: string, password: string): Promise<Student | null>;
	deleteStudent(studentId: number): Promise<void>;
}

