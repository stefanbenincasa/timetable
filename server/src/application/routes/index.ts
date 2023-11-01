import express, { Express, Request, Response } from 'express'

import { databaseConfig } from '../../assets/config'

import { Router } from 'express'
import { Pool } from 'pg'

import { Class } from '../../domain/Class'
import { CustomError } from '../../domain/CustomError'
import { Timetable } from '../../domain/Timetable'

import { verifySession } from '../controllers/secure'

const router = Router()
const pgPool: Pool = new Pool(databaseConfig)

router.post('/login', async (req: Request, res: Response) => { 
	let { email, password } = req.body, student 

	try {
		if(!req.session.studentId) {
			const queryRes = await pgPool.query('SELECT student_id, first_name, last_name, email, password FROM student WHERE email = $1 AND password = $2;', [email, password])

			if(!queryRes.rows) throw new CustomError(500)
			student = queryRes.rows.find(row => row.email === email && row.password === password)
			if(!student) {
				res.status(401).send()
				return
			}

			console.log(student)
			req.session.studentId = student.student_id
			console.log('New session ID assigned', req.session.id)
		}
		else {
			console.log('Redirecting to Home Page...')
			// Send new Response object to redirect to appropriate Client homepage
		}
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}

  res.send()
}); 

router.get('/logout', verifySession, async (req: Request, res: Response) => { 
  req.session.destroy((err) => {
    if(err) console.error(err);
		console.log('Successful logout. Session deleted.')
    res.send()
  });
});

// Should display timetable for the current logged in, else 401
router.get('/', verifySession, async (req: Request, res: Response) => { 
	let studentId = req.session.studentId, query = '', timetable: Timetable, cls: Class

	// Get the timetable object of the current student
	query = `
		SELECT CONCAT(s.first_name, ' ', s.last_name) AS student, sub.name, sub.description, sub.passing_grade,
		c.class_id, c.teacher, c.location, c.date_time, c.max_students
		FROM student s 
		INNER JOIN timetable t ON s.student_id = t.student_id
		INNER JOIN class c ON c.class_id = t.class_id
		INNER JOIN subject sub ON sub.subject_id = c.subject_id
		WHERE s.student_id = $1;
	`

	// Set the Timetable object using query response, if any, then send
	const queryRes = await pgPool.query(query, [studentId])
	
	res.json(queryRes.rows) 
})

export default router

