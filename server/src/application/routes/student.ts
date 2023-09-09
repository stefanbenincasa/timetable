import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'

import { verifySession } from '../controllers/secure';
import * as studentControllers from '../controllers/student'

const router = Router();

router.post('/signup', verifySession, async (req: Request, res: Response) => { 
	let { firstName, lastName, email, password } = req.body

	try {
		const newStudent = await studentControllers.insertNewStudent(new PSQLStudentRepository(), firstName, lastName, email, password)
		console.log(`New Student Created.`, newStudent)
	}
	catch(error) {
		console.error(error)
		res.sendStatus(500)
	}

  res.send()
});

router.get('/profile', (req: Request, res: Response) => { 
	res.send('Student route'); 
});

router.put('/update_account', (req: Request, res: Response) => { 
	res.send(); 
});

router.delete('/delete_account', (req: Request, res: Response) => { 
	res.send(); 
});

export default router

