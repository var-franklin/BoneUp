// file path: backend/src/routes/rules.js

const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all rules
router.get('/', auth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, step, instruction, correct_action FROM rules ORDER BY step');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

module.exports = router;
