import { Timetable } from './Timetable'

export interface TimetableRepository {
  readTimetable(studentId: number): Promise<Timetable>;
}

