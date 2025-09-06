// file path: backend/src/routes/attempts.js

const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// Save attempt
router.post('/', auth, async (req, res) => {
  const { score, hints_used } = req.body;
  try {
    await pool.query(
      'INSERT INTO attempts (user_id, score, hints_used) VALUES (?, ?, ?)',
      [req.user.id, score, hints_used]
    );
    res.json({ message: 'Attempt saved' });
  } catch (e) {
    res.status(500).json({ error: 'Save failed', details: e.message });
  }
});

// Get user attempts
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, score, hints_used, created_at FROM attempts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

module.exports = router;
