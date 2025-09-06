CREATE DATABASE IF NOT EXISTS boneup_db;
USE boneup_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','instructor') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rules table (each step of deboning)
CREATE TABLE IF NOT EXISTS rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  step INT NOT NULL,
  instruction VARCHAR(255) NOT NULL,
  correct_action VARCHAR(100) NOT NULL
);

-- Attempts table (records practice sessions)
CREATE TABLE IF NOT EXISTS attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
