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
			const queryRes = await pgPool.query('SELECT * FROM student WHERE email = $1 AND password = $2;', [email, password])

			if(!queryRes.rows) throw new CustomError(500)
			student = queryRes.rows.find(row => row.email === email && row.password === password)
			if(!student) {
				res.status(401).send()
				return
			}

			req.session.studentId = student.studentId
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
		SELECT CONCAT(s.firstName, ' ', s.lastName) AS student, sub.name, sub.description, sub.passingGrade,
		c.classId, c.teacher, c.location, c.dateTime, c.maxStudents
		FROM student s 
		INNER JOIN timetable t ON s.studentId = t.studentId
		INNER JOIN class c ON c.classId = t.classId
		INNER JOIN subject sub ON sub.subjectId = c.subjectId
		WHERE s.studentId = $1;
	`

	// Set the Timetable object using query response, if any, then send
	const queryRes = await pgPool.query(query, [studentId])
	
	res.json(queryRes.rows) 
})

export default router

