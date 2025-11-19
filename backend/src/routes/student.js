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

// ==================== INSTRUCTOR ENROLLMENT ====================

// Get all available instructors
router.get('/instructors', authMiddleware, isStudent, async (req, res) => {
  try {
    const [instructors] = await pool.query(
      `SELECT 
        u.id, 
        u.full_name, 
        u.email, 
        u.created_at,
        (SELECT COUNT(*) FROM enrollments WHERE instructor_id = u.id AND status = 'accepted') as student_count,
        (SELECT status FROM enrollments WHERE instructor_id = u.id AND student_id = ?) as enrollment_status
       FROM users u
       WHERE u.role = 'instructor'
       ORDER BY u.full_name`,
      [req.user.id]
    );
    
    res.json({ instructors });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch instructors', details: e.message });
  }
});

// Get all instructors student is enrolled with
router.get('/my-instructors', authMiddleware, isStudent, async (req, res) => {
  try {
    const [instructors] = await pool.query(
      `SELECT 
        u.id, 
        u.full_name, 
        u.email,
        e.status,
        e.requested_at,
        e.responded_at
       FROM enrollments e
       JOIN users u ON e.instructor_id = u.id
       WHERE e.student_id = ?
       ORDER BY e.requested_at DESC`,
      [req.user.id]
    );

    res.json({ instructors });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch instructors', details: e.message });
  }
});

// Request to join an instructor's class
router.post('/instructors/:instructorId/request', authMiddleware, isStudent, async (req, res) => {
  try {
    // Verify instructor exists
    const [instructor] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND role = "instructor"',
      [req.params.instructorId]
    );

    if (instructor.length === 0) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    // Check if enrollment already exists
    const [existing] = await pool.query(
      'SELECT * FROM enrollments WHERE instructor_id = ? AND student_id = ?',
      [req.params.instructorId, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        error: 'Enrollment already exists', 
        status: existing[0].status 
      });
    }

    // Create enrollment request
    await pool.query(
      'INSERT INTO enrollments (instructor_id, student_id, status) VALUES (?, ?, "pending")',
      [req.params.instructorId, req.user.id]
    );

    res.json({ message: 'Enrollment request sent successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send enrollment request', details: e.message });
  }
});

// Cancel enrollment request or leave class
router.delete('/instructors/:instructorId/leave', authMiddleware, isStudent, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM enrollments WHERE instructor_id = ? AND student_id = ?',
      [req.params.instructorId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({ message: 'Successfully left instructor\'s class' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to leave class', details: e.message });
  }
});

// ==================== PROFILE MANAGEMENT ====================

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

// ==================== ATTEMPTS TRACKING ====================

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

// ==================== DASHBOARD STATISTICS ====================

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

    const [enrolledInstructors] = await pool.query(
      'SELECT COUNT(*) as count FROM enrollments WHERE student_id = ? AND status = "accepted"',
      [req.user.id]
    );

    res.json({
      stats: {
        total_attempts: totalAttempts[0].count,
        average_score: avgScore[0].avg_score ? Math.round(avgScore[0].avg_score) : 0,
        best_score: bestScore[0].best_score || 0,
        enrolled_instructors: enrolledInstructors[0].count,
        recent_attempts: recentAttempts
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: e.message });
  }
});

module.exports = router;