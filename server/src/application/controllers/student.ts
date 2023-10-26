import { StudentRepository } from '../../domain/StudentRepository'
import { Student } from '../../domain/Student'

export async function insertNewStudent(studentRepository: StudentRepository, firstName: string, lastName: string, email: string, password: string): Promise<Student> {
	const newStudent = new Student(0, firstName, lastName, email, password)
	const createdStudent = await studentRepository.storeNew(newStudent)
	return createdStudent
}

export async function readStudent(studentRepository: StudentRepository, studentId: number): Promise<Student> {
	const existingStudent = await studentRepository.readStudent(studentId)
	return existingStudent 
}

export async function deleteStudent(studentRepository: StudentRepository, studentId: number): Promise<void> {
	await studentRepository.deleteStudent(studentId)
}

