-- File Path: backend/db.sql

CREATE DATABASE IF NOT EXISTS boneup_db;
USE boneup_db;

-- Users table (student, instructor, admin)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','instructor','admin') DEFAULT 'student',
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User profiles for additional information
CREATE TABLE IF NOT EXISTS user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  experience_level ENUM('beginner','some','intermediate','advanced') DEFAULT 'beginner',
  goals TEXT,
  bio TEXT,
  avatar_url VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses table (created by instructors)
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  status ENUM('active', 'archived') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_course_code (course_code),
  INDEX idx_instructor (instructor_id)
);

-- Course enrollments (students enrolled in courses)
CREATE TABLE IF NOT EXISTS course_enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_course_enrollment (course_id, student_id),
  INDEX idx_course_status (course_id, status),
  INDEX idx_student_status (student_id, status)
);

-- Course materials (lectures, documents, etc.)
CREATE TABLE IF NOT EXISTS course_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('lecture', 'document', 'video', 'simulation') DEFAULT 'lecture',
  content TEXT,
  material_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course_order (course_id, material_order)
);

-- Rules table (managed by instructors, can be course-specific or global)
CREATE TABLE IF NOT EXISTS rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NULL,
  step INT NOT NULL,
  instruction VARCHAR(255) NOT NULL,
  correct_action VARCHAR(100) NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Attempts table (practice sessions by students, linked to courses)
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NULL,
  score INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  INDEX idx_user_course (user_id, course_id)
);

-- Insert default global rules (not tied to specific courses)
INSERT INTO rules (course_id, step, instruction, correct_action, created_by) VALUES
(NULL, 1, 'Place the fish on a clean cutting board with the belly facing you', 'position_fish', NULL),
(NULL, 2, 'Make an incision behind the gills down to the backbone', 'cut_behind_gills', NULL),
(NULL, 3, 'Cut along the backbone from head to tail', 'cut_along_backbone', NULL),
(NULL, 4, 'Flip the fish and repeat on the other side', 'flip_and_repeat', NULL),
(NULL, 5, 'Remove the fillet and check for remaining bones', 'remove_fillet', NULL),
(NULL, 6, 'Use tweezers to remove any pin bones', 'remove_pin_bones', NULL),
(NULL, 7, 'Rinse the fillet under cold water', 'rinse_fillet', NULL),
(NULL, 8, 'Pat dry with paper towels', 'pat_dry', NULL);