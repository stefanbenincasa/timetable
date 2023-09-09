import { Student } from './Student'

export interface StudentRepository {
  storeNew(student: Student): Promise<Student>;
}

