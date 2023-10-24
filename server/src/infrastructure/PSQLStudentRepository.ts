import { StudentRepository } from '../domain/StudentRepository'
import { CustomError } from '../domain/CustomError'
import { Student } from '../domain/Student'
import { Pool } from 'pg'

import { databaseConfig } from '../assets/config'

const pgPool: Pool = new Pool(databaseConfig)

export class PSQLStudentRepository implements StudentRepository {
  async storeNew(student: Student): Promise<Student> {
		const queryRes = await pgPool.query(
			'INSERT INTO student(first_name, last_name, email, password) VALUES(LOWER($1), LOWER($2), $3, $4) RETURNING *;',
			[student.firstName, student.lastName, student.email, student.password]
		)

		if(!queryRes || queryRes.rows.length === 0) throw new CustomError(500)
		console.log('New Student created!')
		const newStudent = new Student(
		queryRes.rows[0].student_id, 
		queryRes.rows[0].first_name, 
		queryRes.rows[0].last_name, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return newStudent
	}
	async readStudent(studentId: number): Promise<Student> {
		const queryRes = await pgPool.query('SELECT * FROM student WHERE student_id = $1;', [studentId])

		if(!queryRes || queryRes.rows.length === 0) throw new CustomError(500)
		console.log('Student found. Returning to Client...')
		const student = new Student(
		queryRes.rows[0].student_id, 
		queryRes.rows[0].first_name, 
		queryRes.rows[0].last_name, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return student 
	}
}

