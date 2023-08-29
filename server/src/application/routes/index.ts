import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => { 
	let { username, password } = req.body
	req.session.username = 'john@example.com';
  res.json(req.session);
});

export default router

