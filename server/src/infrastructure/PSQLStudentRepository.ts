import { StudentRepository } from '../domain/StudentRepository'
import { CustomError } from '../domain/CustomError'
import { Student } from '../domain/Student'
import { Pool } from 'pg'

import { databaseConfig } from '../assets/config'

const pgPool: Pool = new Pool(databaseConfig)

export class PSQLStudentRepository implements StudentRepository {
  async storeNew(student: Student): Promise<Student> {
		const queryRes = await pgPool.query(
			'INSERT INTO student(firstName, lastName, email, password) VALUES(LOWER($1), LOWER($2), $3, $4) RETURNING *;',
			[student.firstName, student.lastName, student.email, student.password]
		)

		if(!queryRes || queryRes.rows.length === 0) throw new CustomError(500)
		console.log('New Student created!')
		const newStudent = new Student(
		queryRes.rows[0].studentId, 
		queryRes.rows[0].firstName, 
		queryRes.rows[0].lastName, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return newStudent
	}

	async readStudent(studentId: number): Promise<Student> {
		const queryRes = await pgPool.query('SELECT * FROM student WHERE studentId = $1;', [studentId])

		if(!queryRes || queryRes.rows.length === 0) throw new CustomError(500)
		console.log('Student found. Returning to Client...')
		const student = new Student(
		queryRes.rows[0].studentId, 
		queryRes.rows[0].firstName, 
		queryRes.rows[0].lastName, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return student 
	}

	// async updateStudent(studentId: number, columns: any[]): Promise<Student> {}

	async deleteStudent(studentId: number): Promise<void> {
		let queryRes = await pgPool.query('DELETE FROM student WHERE studentId = $1;', [studentId])
		queryRes = await pgPool.query('SELECT * FROM student WHERE studentId = $1;', [studentId])

		if(!queryRes || queryRes.rows.length > 0) throw new CustomError(500)
		console.log('Student deleted. Returning to Client...')
	}
}

