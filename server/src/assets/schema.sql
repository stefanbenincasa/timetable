CREATE TABLE student(
	student_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50),
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(50) NOT NULL,
	CONSTRAINT u_student_full_name UNIQUE(first_name, last_name)
);

CREATE TABLE subject(
	subject_id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(500),
	passing_grade INT DEFAULT 50
);

CREATE TABLE class(
	class_id SERIAL PRIMARY KEY,
	teacher VARCHAR(100) NOT NULL,
	location VARCHAR(100) DEFAULT 'TBA',
	date_time TIMESTAMP NOT NULL,
	max_students INT,
	subject_id INT,
	FOREIGN KEY (subject_id) REFERENCES subject(subject_id) ON DELETE CASCADE
);

CREATE TABLE timetable(
	student_id INT,
	class_id INT,
	PRIMARY KEY (student_id, class_id),
	FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
	FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);
