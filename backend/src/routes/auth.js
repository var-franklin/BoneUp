// file path: backend/src/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Register (students and instructors only, no admin registration)
router.post('/register', async (req, res) => {
  const { email, password, role, full_name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Prevent admin registration through this endpoint
  if (role === 'admin') {
    return res.status(403).json({ error: 'Cannot register as admin' });
  }

  const userRole = role === 'instructor' ? 'instructor' : 'student';

  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES (?, ?, ?, ?)',
      [email, hash, userRole, full_name || null]
    );

    // Create user profile
    await pool.query(
      'INSERT INTO user_profiles (user_id) VALUES (?)',
      [result.insertId]
    );

    res.json({ message: 'User registered successfully', userId: result.insertId });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed', details: e.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '4h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Login failed', details: e.message });
  }
});

// Get current user profile (NOW USING authMiddleware)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [userRows] = await pool.query(
      'SELECT u.id, u.email, u.role, u.full_name, u.created_at, up.experience_level, up.goals, up.bio, up.avatar_url FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?',
      [req.user.id]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRows[0];

    // If student, get enrolled courses count
    if (user.role === 'student') {
      const [courseCount] = await pool.query(
        'SELECT COUNT(*) as count FROM course_enrollments WHERE student_id = ? AND status = "accepted"',
        [user.id]
      );
      user.enrolled_courses = courseCount[0].count;
    }

    // If instructor, get course and student count
    if (user.role === 'instructor') {
      const [courseCount] = await pool.query(
        'SELECT COUNT(*) as count FROM courses WHERE instructor_id = ?',
        [user.id]
      );
      const [studentCount] = await pool.query(
        'SELECT COUNT(*) as count FROM course_enrollments ce JOIN courses c ON ce.course_id = c.id WHERE c.instructor_id = ? AND ce.status = "accepted"',
        [user.id]
      );
      user.course_count = courseCount[0].count;
      user.student_count = studentCount[0].count;
    }

    res.json({ user });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch user', details: e.message });
  }
});

module.exports = router;