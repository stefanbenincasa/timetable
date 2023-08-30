INSERT INTO student(first_name, last_name, email, password)
VALUES(
	'John', 
	'Smith', 
	'john.smith@email.com', 
	'qwerty'
);

INSERT INTO subject(name, description, passing_grade)
VALUES(
	'Introductory Programming', 
	'An introductory course to programming on simple control structures.', 
	60
);

INSERT INTO class(teacher, location, date_time, max_students, subject_id)
VALUES(
	'Dr Henry Morgan', 
	'St Johns Hall, East Wing, Second Floor, Room 203', 
	CURRENT_TIMESTAMP,
	100,
	1
);

INSERT INTO timetable(student_id, class_id) VALUES(1, 1);

