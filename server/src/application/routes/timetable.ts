import express, { Express, Request, Response } from 'express'

import { Router } from 'express'
import { Timetable } from '../../domain/Timetable'
import { PSQLTimetableRepository } from '../../infrastructure/PSQLTimetableRepository'

import { verifySession } from '../controllers/secure'

import * as timetableControllers from '../controllers/timetable'

const router = Router()

router.get('/', verifySession, async (req: Request, res: Response) => { 
    let timetable: Timetable
    
    try {
        if(req.session.studentId) {
            timetable = await timetableControllers.readTimetable(new PSQLTimetableRepository(), req.session.studentId)
            if(!timetable) {
                res.status(401).send()
                return
            }

            res.json(timetable)
        }
        else {
            throw new Error()
        }
    }
    catch(error) {
		console.error(error)
		res.sendStatus(500)
	}
})

export default router
