import express, { Express, Request, Response } from 'express'
import { databaseConfig } from '../assets/config'
import { CustomError } from '../domain/CustomError'
import { Pool, PoolConfig } from 'pg'

import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import pgSession from 'connect-pg-simple'

import indexRouter from './routes/index'
import studentRouter from './routes/student'

// Init
const port = 5000
const pgStore = pgSession(session)
const app: Express = express()
const pgPool: Pool = new Pool(databaseConfig)

app.set('trust proxy', 1)
app.set('env', 'development')

// Mounting
app.use(session({
  secret: '06d2d0aa-4233-11ee-aa08-80fa5b895e5e',
  resave: false,
  saveUninitialized: false,
	cookie: { 
		secure: app.get('env') === 'development' ? false : true,
		maxAge: 9000,
		sameSite: true,
		httpOnly: true
	},
	store: new pgStore({
    pool : pgPool,                
		createTableIfMissing: true
  })
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/', indexRouter)
app.use('/student', studentRouter)

// Other
app.listen(port, () => {
	let output = 
	"Server is " +
	"running at http://localhost:" +
	port

	console.log(output)
});

// Error Handling
app.use(function errorHandler(error: CustomError, req: Request, res: Response, next: any) {
	console.log('Path: ', req.path)
	console.error('Error: ', error)

	if (error.kind === 'bad request') {
		res.status(400).send(error)
	}
	else if(error.kind === 'unauthorized') {
		res.status(401).send(error)
	}
	else if(error.kind === 'not found') {
		res.status(404).send(error)
	}
	else if (!error.kind) {
		res.status(500).send(error)
	}
}) 

