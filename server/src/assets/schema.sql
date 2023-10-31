CREATE TABLE student(
    studentId SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
	CONSTRAINT u_student_full_name UNIQUE(firstName, lastName)
);

CREATE TABLE subject(
    subjectId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500),
	passingGrade INT DEFAULT 50
);

CREATE TABLE class(
    classId SERIAL PRIMARY KEY,
	teacher VARCHAR(100) NOT NULL,
	location VARCHAR(100) DEFAULT 'TBA',
	dateTime TIMESTAMP NOT NULL,
	maxStudents INT,
	subjectId INT,
	FOREIGN KEY (subjectId) REFERENCES subject(subjectId) ON DELETE CASCADE
);

CREATE TABLE timetable(
	studentId INT,
	classId INT,
	PRIMARY KEY (studentId, classId),
	FOREIGN KEY (studentId) REFERENCES student(studentId) ON DELETE CASCADE,
	FOREIGN KEY (classId) REFERENCES class(classId) ON DELETE CASCADE
);
