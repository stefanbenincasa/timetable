import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { Student } from '../../domain/Student'
import { Pool } from 'pg'

import { verifySession } from '../controllers/secure';
import { databaseConfig } from '../../assets/config'

const pgPool: Pool = new Pool(databaseConfig)
const router = Router();

// Remember to hash passwords
router.post('/signup', verifySession, async (req: Request, res: Response) => { 
	let { firstName, lastName, email, password } = req.body, q = '', student: Student
	q = `INSERT INTO student(first_name, last_name, email, password) 
	VALUES(LOWER($1), LOWER($2), $3, $4);`

	try {
		const queryRes = await pgPool.query(q, [firstName, lastName, email, password])
		console.log('New Student created!')
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

