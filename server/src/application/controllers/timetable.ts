import { TimetableRepository } from '../../domain/TimetableRepository'
import { Timetable} from '../../domain/Timetable'

export async function readTimetable(timetableRepository: TimetableRepository, studentId: number): Promise<Timetable> {
	const studentTimetable = await timetableRepository.readTimetable(studentId)
	return studentTimetable
}