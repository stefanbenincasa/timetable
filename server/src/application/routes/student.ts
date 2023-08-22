import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => { 
	res.send(); 
});

router.get('/', (req: Request, res: Response) => { 
	res.send('Student route'); 
});

router.put('/', (req: Request, res: Response) => { 
	res.send(); 
});

router.delete('/', (req: Request, res: Response) => { 
	res.send(); 
});

export default router

