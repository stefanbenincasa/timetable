INSERT INTO student(first_name, last_name, email, password)
VALUES(
	'john', 
	'smith', 
	'john.smith@email.com', 
	'qwerty'
);

INSERT INTO subject(name, description, passing_grade)
VALUES(
	'Introductory Programming', 
	'An introductory course to programming on simple control structures.', 
	60
);
INSERT INTO subject(name, description, passing_grade)
VALUES(
	'Systems Design', 
	'Discover the use of systems language including UML and MHL', 
	70
);
INSERT INTO subject(name, description, passing_grade)
VALUES(
	'Electronics 101', 
	'Delve into the essentials of electricity using resistance, current, and voltage, for the building a basic circuits', 
	70
);
INSERT INTO subject(name, description, passing_grade)
VALUES(
	'Entrepreneurship Today', 
	'Utilise modern business techniques to run a project tech startup with limited capital, guided by industry exprerts', 
	65
);

INSERT INTO class(teacher, location, date_time, duration_minutes, max_students, subject_id)
VALUES(
	'Dr Henry Morgan', 
	'St Johns Hall, East Wing, Second Floor, Room 203', 
	'2023-06-15 13:30:00',
	60,
	20,
	1
);

INSERT INTO class(teacher, location, date_time, duration_minutes, max_students, subject_id)
VALUES(
	'Mr Michael Williams', 
	'John T. Edwards Building, Third Floor, Room 307', 
	'2023-09-15 14:30:00', 
	90,
	50, 
	1
);
INSERT INTO class(teacher, location, date_time, duration_minutes, max_students, subject_id)
VALUES(
	'Dr John Roberts', 
	'John T. Edwards Building, Second Floor, Room 203', 
	'2023-05-15 09:30:00', 
	120,
	70, 
	2
);
INSERT INTO class(teacher, location, date_time, max_students, subject_id)
VALUES(
	'Mrs Brie Simpson', 
	'Macey Hall, Ground Floor', 
	'2023-01-24 15:30:00', 
	100, 
	4
);

INSERT INTO timetable(student_id, class_id) VALUES(1, 1);
INSERT INTO timetable(student_id, class_id) VALUES(1, 3);
