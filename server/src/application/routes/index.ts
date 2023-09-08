import express, { Express, Request, Response } from 'express';

import { databaseConfig } from '../../assets/config'

import { Router } from 'express';
import { Pool } from 'pg'

import { CustomError } from '../../domain/CustomError'
import { Timetable } from '../../domain/Timetable'

import { verifySession } from '../controllers/secure';

const router = Router();
const pgPool: Pool = new Pool(databaseConfig)

router.post('/login', async (req: Request, res: Response) => { 
	let { email, password } = req.body, student 

	try {
		if(!req.session.studentId) {
			const queryRes = await pgPool.query('SELECT * FROM student WHERE email = $1 AND password = $2;', [email, password])

			if(!queryRes.rows) throw new CustomError(500)
			student = queryRes.rows.find(row => row.email === email && row.password === password)
			if(!student) {
				res.status(401).send()
				return
			}

			req.session.studentId = student.student_id
			console.log('New session ID assigned', req.session.id)
		}
		else {
			console.log('Redirecting to Home Page...')
		}
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}

  res.send()
}); 

// Should display timetable for the current logged in, else 401
router.get('/', verifySession, async (req: Request, res: Response) => { 
	let studentId = req.session.studentId, query = '', timetable: Timetable; 

	// Get the timetable object of the current student
	query = `
		SELECT *
		FROM student s 
		INNER JOIN timetable t ON s.student_id = t.student_id
		INNER JOIN class c ON c.class_id = t.class_id
		WHERE s.student_id = $1;
	`

	// Set the Timetable object using query response, if any
	const queryRes = await pgPool.query(query, [studentId])

	res.send() 
})

export default router

