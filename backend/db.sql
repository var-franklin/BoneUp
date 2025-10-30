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

-- Instructor-Student assignments (one student = one instructor)
CREATE TABLE IF NOT EXISTS instructor_students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  student_id INT UNIQUE NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Rules table (managed by instructors)
CREATE TABLE IF NOT EXISTS rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  step INT NOT NULL,
  instruction VARCHAR(255) NOT NULL,
  correct_action VARCHAR(100) NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Attempts table (practice sessions by students)
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default rules (can be modified by instructors later)
INSERT INTO rules (step, instruction, correct_action, created_by) VALUES
(1, 'Place the fish on a clean cutting board with the belly facing you', 'position_fish', NULL),
(2, 'Make an incision behind the gills down to the backbone', 'cut_behind_gills', NULL),
(3, 'Cut along the backbone from head to tail', 'cut_along_backbone', NULL),
(4, 'Flip the fish and repeat on the other side', 'flip_and_repeat', NULL),
(5, 'Remove the fillet and check for remaining bones', 'remove_fillet', NULL),
(6, 'Use tweezers to remove any pin bones', 'remove_pin_bones', NULL),
(7, 'Rinse the fillet under cold water', 'rinse_fillet', NULL),
(8, 'Pat dry with paper towels', 'pat_dry', NULL);