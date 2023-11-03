import express, { Express, Request, Response } from 'express'

import { Router } from 'express'

import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'

import { verifySession } from '../controllers/secure'
import * as studentControllers from '../controllers/student'

const router = Router()

router.post('/login', async (req: Request, res: Response) => { 
	let { email, password } = req.body, student: Student

	try {
		if(!req.session.studentId) {
			student = await studentControllers.readStudentByEmailPassword(new PSQLStudentRepository(), email, password)

			if(!student) {
				res.status(401).send()
				return
			}

			req.session.studentId = student.studentId
			console.log('New session ID assigned', req.session.id)
			res.json(student)
		}
		else {
			res.send(400)
			console.log("User in Session is already logged in! Log out first.")
		}
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}
}); 

router.get('/logout', verifySession, async (req: Request, res: Response) => { 
  req.session.destroy((err) => {
    if(err) console.error(err);
	console.log('Successful logout. Session deleted.')
    res.send()
  });
});

export default router

