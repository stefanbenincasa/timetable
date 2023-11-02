import { TimetableRepository } from '../domain/TimetableRepository'
import { CustomError } from '../domain/CustomError'
import { Timetable } from '../domain/Timetable'
import { Class } from '../domain/Class'
import { Pool } from 'pg'

import { databaseConfig } from '../assets/config'

const pgPool: Pool = new Pool(databaseConfig)

export class PSQLTimetableRepository implements TimetableRepository {
	async readTimetable(studentId: number): Promise<Timetable> { 
		let timetable: Timetable, classes: Class[], queryRes = await pgPool.query(`
			SELECT 
				*
			FROM 
				student s 
			INNER JOIN 
				timetable t ON s.student_id = t.student_id
			INNER JOIN 
				class c ON c.class_id = t.class_id
			INNER JOIN 
				subject sub ON sub.subject_id = c.subject_id
			WHERE 
				s.student_id = $1;
		`, [studentId])

		classes = queryRes.rows.map(row => new Class(row.class_id, row.teacher, row.date_time, row.subject_id, row.max_students, row.location))
		timetable = new Timetable(studentId, classes)
		return timetable
	}
}
