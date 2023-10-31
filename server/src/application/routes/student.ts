import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { CustomError } from '../../domain/CustomError'
import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'

import { verifySession } from '../controllers/secure';
import * as studentControllers from '../controllers/student'

const router = Router();

router.post('/signup', async (req: Request, res: Response) => { 
	let { firstName, lastName, email, password } = req.body

	try {
		const newStudent: Student = await studentControllers.insertNewStudent(new PSQLStudentRepository(), firstName, lastName, email, password)
		// Sign in here for new Student
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}

  res.send()
});

router.get('/profile', verifySession, async (req: Request, res: Response) => { 
	try {	
		if(req.session.studentId) {
			const student: Student = await studentControllers.readStudent(new PSQLStudentRepository(), req.session.studentId)
			res.json(student)
		}
		else {
			throw new CustomError(500)
		}
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}
});

router.put('/update_account', verifySession, async (req: Request, res: Response) => { 
	res.send(); 
});

router.delete('/delete_account/:delete_id', verifySession, async (req: Request, res: Response) => { 
	try {	
		if(req.session.studentId) {
			let sidForDeletion: any = req.params.delete_id
			if(req.session.studentId != sidForDeletion) {
				console.log('Logged in User can not delete another User at this time.')
				throw Error()
			}
			await studentControllers.deleteStudent(new PSQLStudentRepository(), sidForDeletion)
			req.session.destroy(() => res.send())
		}
		else {
			throw new CustomError(500)
		}
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}
});

export default router

