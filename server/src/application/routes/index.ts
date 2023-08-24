import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => { 
	let options = { secure: true , httpOnly: true, maxAge: 900000, sameSite: true }
	res.cookie('session_id', req.session.id, options)
	res.send('Login route')
});

router.get('/signup', (req: Request, res: Response) => { 
	res.send('Signup route') 
});

export default router

