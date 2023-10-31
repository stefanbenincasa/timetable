import { Student } from './Student'

export interface StudentRepository {
  storeNew(student: Student): Promise<Student>;
	readStudent(studentId: number): Promise<Student>;
	// updateStudent(studentId: number, columns: any[]): Promise<Student>;
	deleteStudent(studentId: number): Promise<void>;
}
