import express, { Express, Request, Response } from 'express';

const verifySession = (req: Request, res: Response, next: any) => {
  if(req.session && req.session.studentId) {
		console.log('User is authenticated.')
    next()
  }else {
		console.log('User is NOT authenticated.')
		res.status(401).send()
  }
}

export { verifySession }

