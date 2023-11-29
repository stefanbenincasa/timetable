import { StudentRepository } from '../domain/StudentRepository'
import { CustomError } from '../domain/CustomError'
import { Student } from '../domain/Student'
import { Pool } from 'pg'

import { databaseConfig } from '../assets/config'

const pgPool: Pool = new Pool(databaseConfig)

export class PSQLStudentRepository implements StudentRepository {
	async storeNew(student: Student): Promise<Student> {
		let queryRes = await pgPool.query(
			`INSERT INTO student(first_name, last_name, email, password) VALUES(LOWER($1),
			 LOWER($2), $3, $4) RETURNING *;`,
			[student.firstName, student.lastName, student.email, student.password]
		)

		if(!queryRes || queryRes.rows.length === 0) throw new CustomError(500)
		console.log('New Student created!')

		let newStudent = new Student(
		queryRes.rows[0].student_id, 
		queryRes.rows[0].first_name, 
		queryRes.rows[0].last_name, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return newStudent
	}

	async readStudentById(studentId: number): Promise<Student | null> {
		let queryRes = await pgPool.query(`SELECT student_id, first_name, last_name, 
			email, password FROM student WHERE student_id = $1;`,
			[studentId])

		if(!queryRes || queryRes.rows.length === 0) return null

		console.log('Student found. Returning Student to Client.')
		let student = new Student(
		queryRes.rows[0].student_id, 
		queryRes.rows[0].first_name, 
		queryRes.rows[0].last_name, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return student 
	}

	async readStudentByEmailPassword(email: string, password: string): Promise<Student | null> {
		let queryRes = await pgPool.query(`SELECT student_id, first_name, last_name, email, password FROM student WHERE email = $1 AND password = $2;`, [email, password])

		if(!queryRes || queryRes.rows.length === 0) return null

		console.log('Student found. Returning Student to Client.')
		let student = new Student(
		queryRes.rows[0].student_id, 
		queryRes.rows[0].first_name, 
		queryRes.rows[0].last_name, 
		queryRes.rows[0].email,
		queryRes.rows[0].password)

		return student 
	}

	async deleteStudent(studentId: number): Promise<void> {
		let queryRes = await pgPool.query('DELETE FROM student WHERE student_id = $1;', [studentId])
		queryRes = await pgPool.query('SELECT * FROM student WHERE student_id = $1;', [studentId])

		if(!queryRes || queryRes.rows.length > 0) throw new CustomError(500)
		console.log('Student deleted. Returning to Client...')
	}
}

