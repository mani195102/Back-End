-- Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('student', 'instructor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    schedule DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- Enrollments Table
CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- Instructors Table
CREATE TABLE Instructors (
    instructor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (class_id) REFERENCES Classes(class_id)
);

-- Add Indexes for faster lookups
CREATE INDEX idx_user_role ON Users(role);
CREATE INDEX idx_course_id ON Classes(course_id);
CREATE INDEX idx_user_id ON Enrollments(user_id);
CREATE INDEX idx_class_id ON Enrollments(class_id);
CREATE INDEX idx_instructor_user_class ON Instructors(user_id, class_id);



-- Insert sample users
INSERT INTO Users (username, email, password_hash, full_name, role) VALUES
('student1', 'student1@example.com', 'hashedpassword1', 'Student One', 'student'),
('student2', 'student2@example.com', 'hashedpassword2', 'Student Two', 'student'),
('instructor1', 'instructor1@example.com', 'hashedpassword3', 'Instructor One', 'instructor');

-- Insert sample courses
INSERT INTO Courses (course_name, description) VALUES
('Course One', 'Description of Course One'),
('Course Two', 'Description of Course Two');

-- Insert sample classes
INSERT INTO Classes (course_id, class_name, schedule) VALUES
(1, 'Class 1 of Course One', '2024-06-01 10:00:00'),
(1, 'Class 2 of Course One', '2024-06-08 10:00:00'),
(2, 'Class 1 of Course Two', '2024-06-02 10:00:00');

-- Insert sample enrollments
INSERT INTO Enrollments (user_id, class_id) VALUES
(1, 1),
(1, 2),
(2, 3);

-- Insert sample instructor assignments
INSERT INTO Instructors (user_id, class_id) VALUES
(3, 1),
(3, 2),
(3, 3);
