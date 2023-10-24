import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { CustomError } from '../../domain/CustomError'
import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'

import { verifySession } from '../controllers/secure';
import * as studentControllers from '../controllers/student'

const router = Router();

router.post('/signup', verifySession, async (req: Request, res: Response) => { 
	let { firstName, lastName, email, password } = req.body

	try {
		const newStudent: Student = await studentControllers.insertNewStudent(new PSQLStudentRepository(), firstName, lastName, email, password)
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

	res.send()
});

router.put('/update_account', (req: Request, res: Response) => { 
	res.send(); 
});

router.delete('/delete_account', (req: Request, res: Response) => { 
	res.send(); 
});

export default router

