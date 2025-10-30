// file path: backend/src/routes/student.js

const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to check if user is student
const isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Student only.' });
  }
  next();
};

// Get available instructors to choose from
router.get('/instructors', authMiddleware, isStudent, async (req, res) => {
  try {
    const [instructors] = await pool.query(
      `SELECT u.id, u.full_name, u.email, u.created_at,
       (SELECT COUNT(*) FROM instructor_students WHERE instructor_id = u.id) as student_count
       FROM users u
       WHERE u.role = 'instructor'
       ORDER BY u.full_name`
    );
    res.json({ instructors });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch instructors', details: e.message });
  }
});

// Get current assigned instructor
router.get('/instructor', authMiddleware, isStudent, async (req, res) => {
  try {
    const [instructor] = await pool.query(
      `SELECT u.id, u.full_name, u.email, ins.assigned_at
       FROM instructor_students ins
       JOIN users u ON ins.instructor_id = u.id
       WHERE ins.student_id = ?`,
      [req.user.id]
    );

    if (instructor.length === 0) {
      return res.json({ instructor: null });
    }

    res.json({ instructor: instructor[0] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch instructor', details: e.message });
  }
});

// Assign self to an instructor (or change instructor)
router.post('/instructor/:instructorId/join', authMiddleware, isStudent, async (req, res) => {
  try {
    // Verify instructor exists
    const [instructor] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND role = "instructor"',
      [req.params.instructorId]
    );

    if (instructor.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    // Remove existing assignment if any
    await pool.query('DELETE FROM instructor_students WHERE student_id = ?', [req.user.id]);

    // Create new assignment
    await pool.query(
      'INSERT INTO instructor_students (instructor_id, student_id) VALUES (?, ?)',
      [req.params.instructorId, req.user.id]
    );

    res.json({ message: 'Successfully joined instructor' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to join instructor', details: e.message });
  }
});

// Leave current instructor
router.delete('/instructor/leave', authMiddleware, isStudent, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM instructor_students WHERE student_id = ?',
      [req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No instructor assignment found' });
    }

    res.json({ message: 'Successfully left instructor' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to leave instructor', details: e.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, isStudent, async (req, res) => {
  const { experience_level, goals, bio } = req.body;

  try {
    const updates = [];
    const values = [];

    if (experience_level && ['beginner', 'some', 'intermediate', 'advanced'].includes(experience_level)) {
      updates.push('experience_level = ?');
      values.push(experience_level);
    }
    if (goals !== undefined) {
      updates.push('goals = ?');
      values.push(typeof goals === 'string' ? goals : JSON.stringify(goals));
    }
    if (bio !== undefined) {
      updates.push('bio = ?');
      values.push(bio);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(req.user.id);

    await pool.query(
      `UPDATE user_profiles SET ${updates.join(', ')} WHERE user_id = ?`,
      values
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update profile', details: e.message });
  }
});

// Get own attempts/practice history
router.get('/attempts', authMiddleware, isStudent, async (req, res) => {
  try {
    const [attempts] = await pool.query(
      'SELECT * FROM attempts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ attempts });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch attempts', details: e.message });
  }
});

// Get student dashboard statistics
router.get('/dashboard/stats', authMiddleware, isStudent, async (req, res) => {
  try {
    const [totalAttempts] = await pool.query(
      'SELECT COUNT(*) as count FROM attempts WHERE user_id = ?',
      [req.user.id]
    );

    const [avgScore] = await pool.query(
      'SELECT AVG(score) as avg_score FROM attempts WHERE user_id = ?',
      [req.user.id]
    );

    const [bestScore] = await pool.query(
      'SELECT MAX(score) as best_score FROM attempts WHERE user_id = ?',
      [req.user.id]
    );

    const [recentAttempts] = await pool.query(
      'SELECT * FROM attempts WHERE user_id = ? ORDER BY created_at DESC LIMIT 5',
      [req.user.id]
    );

    res.json({
      stats: {
        total_attempts: totalAttempts[0].count,
        average_score: avgScore[0].avg_score || 0,
        best_score: bestScore[0].best_score || 0,
        recent_attempts: recentAttempts
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: e.message });
  }
});

module.exports = router;