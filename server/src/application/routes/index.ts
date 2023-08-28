import express, { Express, Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => { 
	req.session.username = 'john@example.com';
  res.json(req.session);
});

export default router

