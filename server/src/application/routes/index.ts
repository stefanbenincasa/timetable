import express, { Express, Request, Response } from 'express'

import { Router } from 'express'

import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'
import { CustomError } from '../../domain/CustomError'

import { verifySession } from '../controllers/secure'
import * as studentControllers from '../controllers/student'

const router = Router()

router.post('/login', async (req: Request, res: Response) => { 
	let { email, password } = req.body, student: Student | null

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
			console.log("User in Session is already logged in! Log out first.")
			res.status(400).send()
		}
	}
	catch(error) {
		console.error(error)
		throw error
	}
}); 

router.get('/logout', verifySession, async (req: Request, res: Response) => { 
  req.session.destroy((err) => {
    if(err) {
		console.error(err);
		throw new CustomError(500)
	}

	console.log('Successful logout. Session deleted.')
    res.send()
  });
});

export default router

