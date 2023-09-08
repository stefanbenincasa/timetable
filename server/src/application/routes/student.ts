import express, { Express, Request, Response } from 'express';

import { Router } from 'express';
import { verifySession } from '../controllers/secure';

const router = Router();

// Remember to hash passwords
router.post('/signup', verifySession, (req: Request, res: Response) => { 
	let { email, password } = req.body 
	// res.json(queryRes.rows) 
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

