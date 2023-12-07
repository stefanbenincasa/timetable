import express, { Express, Request, Response } from 'express';

const verifySession = (req: Request, res: Response, next: any) => {
  console.log(req.session.studentId)
  if(req.session && req.session.studentId) {
    next()
  }else {
		res.status(401).send()
  }
}

export { verifySession }
