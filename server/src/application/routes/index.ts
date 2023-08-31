import express, { Express, Request, Response } from 'express';
import { Router } from 'express';
import { verifySession } from '../controllers/secure';

const router = Router();

router.post('/login', (req: Request, res: Response) => { 
	let { username, password } = req.body, authenticated = false

  res.send()
});

export default router

