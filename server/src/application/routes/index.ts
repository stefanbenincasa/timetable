import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import { verifySession } from '../controllers/secure';

const router = Router();

router.post('/login', async (req: Request, res: Response) => { 
	let { username, password } = req.body, authenticated = false, databasePool = req.app.get('database')

	// Query the database
	console.log(databasePool)
	// const queryRes = await databasePool.queryWithParams("SELECT * FROM student;")
	queryWithParams
	// console.log(queryRes.rows)
	
  res.send()
});

export default router

