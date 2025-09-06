// file path: backend/src/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, hash, role || 'student']
    );
    res.json({ message: 'User registered' });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed', details: e.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: 'Login failed', details: e.message });
  }
});

module.exports = router;
