// file path: backend/src/routes/instructor.js

const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to check if user is instructor
const isInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ error: 'Access denied. Instructor only.' });
  }
  next();
};

// Get all students assigned to this instructor
router.get('/students', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [students] = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.created_at, up.experience_level, 
       ins.assigned_at,
       (SELECT COUNT(*) FROM attempts WHERE user_id = u.id) as total_attempts,
       (SELECT AVG(score) FROM attempts WHERE user_id = u.id) as avg_score
       FROM instructor_students ins
       JOIN users u ON ins.student_id = u.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE ins.instructor_id = ?
       ORDER BY ins.assigned_at DESC`,
      [req.user.id]
    );
    res.json({ students });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch students', details: e.message });
  }
});

// Get student details with attempts
router.get('/students/:studentId', authMiddleware, isInstructor, async (req, res) => {
  try {
    // Verify this student is assigned to this instructor
    const [check] = await pool.query(
      'SELECT * FROM instructor_students WHERE instructor_id = ? AND student_id = ?',
      [req.user.id, req.params.studentId]
    );

    if (check.length === 0) {
      return res.status(403).json({ error: 'This student is not assigned to you' });
    }

    // Get student info
    const [students] = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.created_at, up.*
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [req.params.studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get student's attempts
    const [attempts] = await pool.query(
      'SELECT * FROM attempts WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.studentId]
    );

    res.json({ student: students[0], attempts });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch student details', details: e.message });
  }
});

// Assign student to instructor
router.post('/students/:studentId/assign', authMiddleware, isInstructor, async (req, res) => {
  try {
    // Check if student exists and is actually a student
    const [student] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND role = "student"',
      [req.params.studentId]
    );

    if (student.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Remove any existing assignment (student can only have one instructor)
    await pool.query('DELETE FROM instructor_students WHERE student_id = ?', [req.params.studentId]);

    // Create new assignment
    await pool.query(
      'INSERT INTO instructor_students (instructor_id, student_id) VALUES (?, ?)',
      [req.user.id, req.params.studentId]
    );

    res.json({ message: 'Student assigned successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to assign student', details: e.message });
  }
});

// Remove student assignment
router.delete('/students/:studentId/unassign', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM instructor_students WHERE instructor_id = ? AND student_id = ?',
      [req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student assignment not found' });
    }

    res.json({ message: 'Student unassigned successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to unassign student', details: e.message });
  }
});

// Get all rules (instructor can view all)
router.get('/rules', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [rules] = await pool.query(
      `SELECT r.*, u.full_name as creator_name 
       FROM rules r 
       LEFT JOIN users u ON r.created_by = u.id 
       ORDER BY r.step`
    );
    res.json({ rules });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch rules', details: e.message });
  }
});

// Create new rule
router.post('/rules', authMiddleware, isInstructor, async (req, res) => {
  const { step, instruction, correct_action } = req.body;

  if (!step || !instruction || !correct_action) {
    return res.status(400).json({ error: 'Step, instruction, and correct_action are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO rules (step, instruction, correct_action, created_by) VALUES (?, ?, ?, ?)',
      [step, instruction, correct_action, req.user.id]
    );

    res.json({ message: 'Rule created successfully', ruleId: result.insertId });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create rule', details: e.message });
  }
});

// Update rule
router.put('/rules/:ruleId', authMiddleware, isInstructor, async (req, res) => {
  const { step, instruction, correct_action } = req.body;

  try {
    const updates = [];
    const values = [];

    if (step !== undefined) {
      updates.push('step = ?');
      values.push(step);
    }
    if (instruction) {
      updates.push('instruction = ?');
      values.push(instruction);
    }
    if (correct_action) {
      updates.push('correct_action = ?');
      values.push(correct_action);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(req.params.ruleId);
    const [result] = await pool.query(
      `UPDATE rules SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    res.json({ message: 'Rule updated successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update rule', details: e.message });
  }
});

// Delete rule
router.delete('/rules/:ruleId', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM rules WHERE id = ?', [req.params.ruleId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    res.json({ message: 'Rule deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete rule', details: e.message });
  }
});

// Get instructor dashboard statistics
router.get('/dashboard/stats', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [studentCount] = await pool.query(
      'SELECT COUNT(*) as count FROM instructor_students WHERE instructor_id = ?',
      [req.user.id]
    );

    const [totalAttempts] = await pool.query(
      `SELECT COUNT(*) as count FROM attempts a 
       JOIN instructor_students ins ON a.user_id = ins.student_id 
       WHERE ins.instructor_id = ?`,
      [req.user.id]
    );

    const [avgScore] = await pool.query(
      `SELECT AVG(a.score) as avg_score FROM attempts a 
       JOIN instructor_students ins ON a.user_id = ins.student_id 
       WHERE ins.instructor_id = ?`,
      [req.user.id]
    );

    res.json({
      stats: {
        student_count: studentCount[0].count,
        total_attempts: totalAttempts[0].count,
        average_score: avgScore[0].avg_score || 0
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: e.message });
  }
});

module.exports = router;