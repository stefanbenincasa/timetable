import express, { Express, Request, Response } from 'express';

import { databaseConfig } from '../../assets/config'

import { Router } from 'express';
import { Pool } from 'pg'

import { verifySession } from '../controllers/secure';

const router = Router();
const pgPool: Pool = new Pool(databaseConfig)

router.post('/login', async (req: Request, res: Response) => { 
	let { username, password } = req.body, authenticated = false 
	const queryRes = await pgPool.query("SELECT * FROM student WHERE $1;", [1])
	console.log(queryRes.rows)
  res.send()
});

export default router

