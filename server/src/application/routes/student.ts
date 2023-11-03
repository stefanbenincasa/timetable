import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { CustomError } from '../../domain/CustomError'
import { Student } from '../../domain/Student'
import { PSQLStudentRepository } from '../../infrastructure/PSQLStudentRepository'

import { verifySession } from '../controllers/secure';
import * as studentControllers from '../controllers/student'

const router = Router();

router.post('/signup', async (req: Request, res: Response) => { 
	let { firstName, lastName, email, password } = req.body, newStudent: Student

	try {
		newStudent = await studentControllers.insertNewStudent(new PSQLStudentRepository(), firstName, lastName, email, password)
		req.session.studentId = newStudent.studentId
		console.log('New session ID assigned', req.session.id)
		res.json(newStudent)
	}
	catch(error) {
		console.error(error)
		throw error
	}
});

router.get('/profile', verifySession, async (req: Request, res: Response) => { 
	let student: Student
	
	try {	
		if(req.session.studentId) { // Narrowing for Student controller function
			student = await studentControllers.readStudentById(new PSQLStudentRepository(), req.session.studentId)
			res.json(student)
		}
		else {
			throw new CustomError(500)
		}
	}
	catch(error) {
		console.error(error)
		throw error
	}
});

// Requires column extraction
router.put('/update_account', verifySession, async (req: Request, res: Response) => { 
	try {
		if(req.session.studentId) {
			await studentControllers.updateStudent(new PSQLStudentRepository(), req.session.studentId, { password: "3453" })
		}
		else {
			throw new CustomError(400)
		}
	}
	catch(error) { 
		console.error(error)
		throw error
	}
});

router.delete('/delete_account/:delete_id', verifySession, async (req: Request, res: Response) => { 
	try {	
		if(req.session.studentId) {
			let sidForDeletion: any = req.params.delete_id
			if(req.session.studentId != sidForDeletion) {
				console.log('Logged in User can not delete another User at this time.')
				throw new CustomError(401)
			}
			await studentControllers.deleteStudent(new PSQLStudentRepository(), sidForDeletion)
			req.session.destroy(() => res.send())
		}
		else {
			throw new CustomError(400)
		}
	}
	catch(error) {
		console.error(error)
		throw error
	}
});

export default router

