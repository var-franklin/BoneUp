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

// ==================== STUDENT MANAGEMENT ====================

// Get all students with their enrollment status for this instructor
router.get('/students', authMiddleware, isInstructor, async (req, res) => {
  try {
    const { status } = req.query; // Filter by status: 'accepted', 'pending', 'rejected', or 'all'
    
    let query = `
      SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.created_at,
        up.experience_level,
        up.bio,
        e.status as enrollment_status,
        e.requested_at,
        e.responded_at,
        (SELECT COUNT(*) FROM attempts WHERE user_id = u.id) as total_attempts,
        (SELECT AVG(score) FROM attempts WHERE user_id = u.id) as avg_score,
        (SELECT MAX(score) FROM attempts WHERE user_id = u.id) as best_score,
        (SELECT created_at FROM attempts WHERE user_id = u.id ORDER BY created_at DESC LIMIT 1) as last_active
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE e.instructor_id = ?
    `;
    
    const params = [req.user.id];
    
    if (status && status !== 'all') {
      query += ' AND e.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY e.requested_at DESC';
    
    const [students] = await pool.query(query, params);
    
    // Calculate additional metrics for each student
    const enrichedStudents = students.map(student => ({
      ...student,
      avg_score: student.avg_score ? Math.round(student.avg_score) : 0,
      best_score: student.best_score || 0,
      performance: getPerformanceLevel(student.avg_score),
      progress: calculateProgress(student.total_attempts),
      streak: 0, // TODO: Implement streak calculation based on consecutive days
      enrolledCourses: 1, // TODO: Implement when course system is added
      completedLessons: student.total_attempts || 0
    }));
    
    res.json({ students: enrichedStudents });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch students', details: e.message });
  }
});

// Get pending enrollment requests
router.get('/students/pending', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.created_at,
        up.experience_level,
        up.bio,
        e.requested_at
      FROM enrollments e
      JOIN users u ON e.student_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE e.instructor_id = ? AND e.status = 'pending'
      ORDER BY e.requested_at DESC`,
      [req.user.id]
    );
    
    res.json({ requests });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch pending requests', details: e.message });
  }
});

// Get detailed information about a specific student
router.get('/students/:studentId', authMiddleware, isInstructor, async (req, res) => {
  try {
    // Verify this student is enrolled with this instructor
    const [enrollment] = await pool.query(
      'SELECT * FROM enrollments WHERE instructor_id = ? AND student_id = ?',
      [req.user.id, req.params.studentId]
    );

    if (enrollment.length === 0) {
      return res.status(403).json({ error: 'This student is not enrolled with you' });
    }

    // Get student info
    const [students] = await pool.query(
      `SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.created_at,
        up.experience_level,
        up.goals,
        up.bio,
        up.avatar_url
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = ?`,
      [req.params.studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Get student's attempts with detailed information
    const [attempts] = await pool.query(
      `SELECT 
        id, 
        score, 
        hints_used, 
        completed, 
        created_at,
        TIMESTAMPDIFF(SECOND, created_at, NOW()) as time_ago_seconds
      FROM attempts 
      WHERE user_id = ? 
      ORDER BY created_at DESC 
      LIMIT 20`,
      [req.params.studentId]
    );

    // Calculate statistics
    const [stats] = await pool.query(
      `SELECT 
        COUNT(*) as total_attempts,
        AVG(score) as avg_score,
        MAX(score) as best_score,
        MIN(score) as lowest_score,
        SUM(hints_used) as total_hints_used
      FROM attempts 
      WHERE user_id = ?`,
      [req.params.studentId]
    );

    const studentData = {
      ...students[0],
      enrollment_status: enrollment[0].status,
      enrolled_at: enrollment[0].responded_at || enrollment[0].requested_at,
      statistics: {
        total_attempts: stats[0].total_attempts || 0,
        avg_score: stats[0].avg_score ? Math.round(stats[0].avg_score) : 0,
        best_score: stats[0].best_score || 0,
        lowest_score: stats[0].lowest_score || 0,
        total_hints_used: stats[0].total_hints_used || 0,
        performance: getPerformanceLevel(stats[0].avg_score)
      },
      recent_attempts: attempts.map(attempt => ({
        ...attempt,
        time_ago: formatTimeAgo(attempt.time_ago_seconds)
      }))
    };

    res.json({ student: studentData });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch student details', details: e.message });
  }
});

// Accept enrollment request
router.post('/students/:studentId/accept', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE enrollments 
       SET status = 'accepted', responded_at = NOW() 
       WHERE instructor_id = ? AND student_id = ? AND status = 'pending'`,
      [req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment request not found or already processed' });
    }

    res.json({ message: 'Student enrollment accepted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to accept enrollment', details: e.message });
  }
});

// Reject enrollment request
router.post('/students/:studentId/reject', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE enrollments 
       SET status = 'rejected', responded_at = NOW() 
       WHERE instructor_id = ? AND student_id = ? AND status = 'pending'`,
      [req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment request not found or already processed' });
    }

    res.json({ message: 'Student enrollment rejected' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reject enrollment', details: e.message });
  }
});

// Remove student from class (delete enrollment)
router.delete('/students/:studentId', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM enrollments WHERE instructor_id = ? AND student_id = ?',
      [req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student enrollment not found' });
    }

    res.json({ message: 'Student removed from class successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to remove student', details: e.message });
  }
});

// ==================== RULES MANAGEMENT ====================

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

// ==================== DASHBOARD STATISTICS ====================

router.get('/dashboard/stats', authMiddleware, isInstructor, async (req, res) => {
  try {
    // Count accepted students
    const [studentCount] = await pool.query(
      'SELECT COUNT(*) as count FROM enrollments WHERE instructor_id = ? AND status = "accepted"',
      [req.user.id]
    );

    // Count pending requests
    const [pendingCount] = await pool.query(
      'SELECT COUNT(*) as count FROM enrollments WHERE instructor_id = ? AND status = "pending"',
      [req.user.id]
    );

    // Total attempts from accepted students
    const [totalAttempts] = await pool.query(
      `SELECT COUNT(*) as count FROM attempts a 
       JOIN enrollments e ON a.user_id = e.student_id 
       WHERE e.instructor_id = ? AND e.status = "accepted"`,
      [req.user.id]
    );

    // Average score of accepted students
    const [avgScore] = await pool.query(
      `SELECT AVG(a.score) as avg_score FROM attempts a 
       JOIN enrollments e ON a.user_id = e.student_id 
       WHERE e.instructor_id = ? AND e.status = "accepted"`,
      [req.user.id]
    );

    // Students who need attention (avg score < 60)
    const [needAttention] = await pool.query(
      `SELECT COUNT(DISTINCT e.student_id) as count 
       FROM enrollments e
       JOIN attempts a ON e.student_id = a.user_id
       WHERE e.instructor_id = ? AND e.status = "accepted"
       GROUP BY e.student_id
       HAVING AVG(a.score) < 60`,
      [req.user.id]
    );

    res.json({
      stats: {
        total_students: studentCount[0].count,
        pending_requests: pendingCount[0].count,
        total_attempts: totalAttempts[0].count,
        average_score: avgScore[0].avg_score ? Math.round(avgScore[0].avg_score) : 0,
        students_need_attention: needAttention.length > 0 ? needAttention.length : 0
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: e.message });
  }
});

// ==================== HELPER FUNCTIONS ====================

function getPerformanceLevel(avgScore) {
  if (!avgScore || avgScore === 0) return 'needs-attention';
  if (avgScore >= 90) return 'excellent';
  if (avgScore >= 75) return 'good';
  return 'needs-attention';
}

function calculateProgress(totalAttempts) {
  if (!totalAttempts) return 0;
  // Assume 20 attempts = 100% progress (adjust as needed)
  const progress = Math.min((totalAttempts / 20) * 100, 100);
  return Math.round(progress);
}

function formatTimeAgo(seconds) {
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

module.exports = router;