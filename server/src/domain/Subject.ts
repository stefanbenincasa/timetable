export class Subject {
	subjectId: number;
	name: string;
	description: string;
	passingGrade: number;

  constructor(subjectId: number, name: string, description: string, passingGrade: number) {
		this.subjectId = subjectId
		this.name = name
		this.description = description
		this.passingGrade = passingGrade
  }
}

