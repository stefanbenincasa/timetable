import { Pool } from 'pg'
// import { databaseConfig } from '../assets/config'

const pool: Pool = new Pool({
		database: 'timetable',
		user: 'stefan',
		password: 'ciTusmoNgo5!',
		port: 5432,
		max: 20, 
		idleTimeoutMillis: 1000,
		connectionTimeoutMillis: 1000,
		maxUses: 7500
}) 

const query = async function (query: string, literals: any[] = []): Promise<any> {
  const client = await pool.connect()
	console.log('Connected!')
  try {
		const queryResponse = await (literals.length === 0 ? client.query(query) : client.query(query, literals));
    client.release()
    return queryResponse
   }
   catch(error) {
     client.release()
		 throw new Error(error instanceof Error ? error.message : String(error)); // Error is caught & re-thrown after client can be released
   }
} 

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client.', err)
  process.exit(-1)
})

module.exports = { query }

