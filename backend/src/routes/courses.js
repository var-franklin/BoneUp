// file path: backend/src/routes/courses.js

const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Helper function to generate unique course code
function generateCourseCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ==================== PUBLIC/STUDENT ROUTES ====================

// Get all available courses (for browsing)
router.get('/browse', authMiddleware, async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT 
        c.id,
        c.name,
        c.description,
        c.course_code,
        c.status,
        c.created_at,
        u.full_name as instructor_name,
        u.email as instructor_email,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id AND status = 'accepted') as student_count,
        (SELECT COUNT(*) FROM course_materials WHERE course_id = c.id) as material_count,
        (SELECT status FROM course_enrollments WHERE course_id = c.id AND student_id = ?) as enrollment_status
       FROM courses c
       JOIN users u ON c.instructor_id = u.id
       WHERE c.status = 'active'
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );
    
    res.json({ courses });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch courses', details: e.message });
  }
});

// Get student's enrolled courses
router.get('/my-courses', authMiddleware, async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT 
        c.id,
        c.name,
        c.description,
        c.course_code,
        c.status,
        u.full_name as instructor_name,
        u.email as instructor_email,
        ce.status as enrollment_status,
        ce.enrolled_at,
        ce.responded_at,
        (SELECT COUNT(*) FROM course_materials WHERE course_id = c.id) as material_count,
        (SELECT COUNT(*) FROM attempts WHERE user_id = ? AND course_id = c.id) as my_attempts,
        COALESCE((SELECT AVG(score) FROM attempts WHERE user_id = ? AND course_id = c.id), 0) as avg_score
       FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       JOIN users u ON c.instructor_id = u.id
       WHERE ce.student_id = ?
       ORDER BY ce.enrolled_at DESC`,
      [req.user.id, req.user.id, req.user.id]
    );

    res.json({ courses });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch enrolled courses', details: e.message });
  }
});

// Get course details (public info)
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT 
        c.*,
        u.full_name as instructor_name,
        u.email as instructor_email,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id AND status = 'accepted') as student_count,
        (SELECT status FROM course_enrollments WHERE course_id = c.id AND student_id = ?) as enrollment_status
       FROM courses c
       JOIN users u ON c.instructor_id = u.id
       WHERE c.id = ?`,
      [req.user.id, req.params.courseId]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ course: courses[0] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch course', details: e.message });
  }
});

// Join course by code
router.post('/join/code', authMiddleware, async (req, res) => {
  const { course_code } = req.body;

  if (!course_code) {
    return res.status(400).json({ error: 'Course code is required' });
  }

  try {
    // Find course by code
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE course_code = ? AND status = "active"',
      [course_code.toUpperCase()]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Invalid course code' });
    }

    const course = courses[0];

    // Check if already enrolled
    const [existing] = await pool.query(
      'SELECT * FROM course_enrollments WHERE course_id = ? AND student_id = ?',
      [course.id, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        error: 'Already enrolled in this course', 
        status: existing[0].status 
      });
    }

    // Create enrollment (automatically accepted when joining by code)
    await pool.query(
      'INSERT INTO course_enrollments (course_id, student_id, status, responded_at) VALUES (?, ?, "accepted", NOW())',
      [course.id, req.user.id]
    );

    res.json({ message: 'Successfully joined course', course_id: course.id });
  } catch (e) {
    res.status(500).json({ error: 'Failed to join course', details: e.message });
  }
});

// Request to join course (requires approval)
router.post('/join/request/:courseId', authMiddleware, async (req, res) => {
  try {
    // Verify course exists
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE id = ? AND status = "active"',
      [req.params.courseId]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if already enrolled
    const [existing] = await pool.query(
      'SELECT * FROM course_enrollments WHERE course_id = ? AND student_id = ?',
      [req.params.courseId, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        error: 'Enrollment already exists', 
        status: existing[0].status 
      });
    }

    // Create enrollment request
    await pool.query(
      'INSERT INTO course_enrollments (course_id, student_id, status) VALUES (?, ?, "pending")',
      [req.params.courseId, req.user.id]
    );

    res.json({ message: 'Enrollment request sent successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send enrollment request', details: e.message });
  }
});

// Leave course
router.delete('/leave/:courseId', authMiddleware, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM course_enrollments WHERE course_id = ? AND student_id = ?',
      [req.params.courseId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json({ message: 'Successfully left course' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to leave course', details: e.message });
  }
});

// ==================== INSTRUCTOR ROUTES ====================

const isInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ error: 'Access denied. Instructor only.' });
  }
  next();
};

// Get instructor's courses
router.get('/instructor/my-courses', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT 
        c.*,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id AND status = 'accepted') as student_count,
        (SELECT COUNT(*) FROM course_enrollments WHERE course_id = c.id AND status = 'pending') as pending_count,
        (SELECT COUNT(*) FROM course_materials WHERE course_id = c.id) as material_count
       FROM courses c
       WHERE c.instructor_id = ?
       ORDER BY c.created_at DESC`,
      [req.user.id]
    );

    res.json({ courses });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch courses', details: e.message });
  }
});

// Create new course
router.post('/instructor/create', authMiddleware, isInstructor, async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Course name is required' });
  }

  try {
    // Generate unique course code
    let course_code;
    let isUnique = false;
    
    while (!isUnique) {
      course_code = generateCourseCode();
      const [existing] = await pool.query('SELECT id FROM courses WHERE course_code = ?', [course_code]);
      if (existing.length === 0) isUnique = true;
    }

    const [result] = await pool.query(
      'INSERT INTO courses (instructor_id, name, description, course_code) VALUES (?, ?, ?, ?)',
      [req.user.id, name, description || null, course_code]
    );

    res.json({ 
      message: 'Course created successfully', 
      course_id: result.insertId,
      course_code 
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create course', details: e.message });
  }
});

// Update course
router.put('/instructor/:courseId', authMiddleware, isInstructor, async (req, res) => {
  const { name, description, status } = req.body;

  try {
    // Verify ownership
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE id = ? AND instructor_id = ?',
      [req.params.courseId, req.user.id]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found or access denied' });
    }

    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (status && ['active', 'archived'].includes(status)) {
      updates.push('status = ?');
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(req.params.courseId);

    await pool.query(
      `UPDATE courses SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ message: 'Course updated successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update course', details: e.message });
  }
});

// Delete course
router.delete('/instructor/:courseId', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM courses WHERE id = ? AND instructor_id = ?',
      [req.params.courseId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found or access denied' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete course', details: e.message });
  }
});

// Get course students
router.get('/instructor/:courseId/students', authMiddleware, isInstructor, async (req, res) => {
  try {
    // Verify ownership
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE id = ? AND instructor_id = ?',
      [req.params.courseId, req.user.id]
    );

    if (courses.length === 0) {
      return res.status(404).json({ error: 'Course not found or access denied' });
    }

    const { status } = req.query;
    let query = `
      SELECT 
        u.id,
        u.email,
        u.full_name,
        ce.status as enrollment_status,
        ce.enrolled_at,
        ce.responded_at,
        (SELECT COUNT(*) FROM attempts WHERE user_id = u.id AND course_id = ?) as total_attempts,
        COALESCE((SELECT AVG(score) FROM attempts WHERE user_id = u.id AND course_id = ?), 0) as avg_score,
        COALESCE((SELECT MAX(score) FROM attempts WHERE user_id = u.id AND course_id = ?), 0) as best_score
      FROM course_enrollments ce
      JOIN users u ON ce.student_id = u.id
      WHERE ce.course_id = ?
    `;
    
    const params = [req.params.courseId, req.params.courseId, req.params.courseId, req.params.courseId];
    
    if (status && status !== 'all') {
      query += ' AND ce.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY ce.enrolled_at DESC';
    
    const [students] = await pool.query(query, params);
    
    res.json({ students });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch students', details: e.message });
  }
});

// Accept student enrollment
router.post('/instructor/:courseId/students/:studentId/accept', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       SET ce.status = 'accepted', ce.responded_at = NOW()
       WHERE c.id = ? AND c.instructor_id = ? AND ce.student_id = ? AND ce.status = 'pending'`,
      [req.params.courseId, req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment request not found or already processed' });
    }

    res.json({ message: 'Student enrollment accepted' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to accept enrollment', details: e.message });
  }
});

// Reject student enrollment
router.post('/instructor/:courseId/students/:studentId/reject', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       SET ce.status = 'rejected', ce.responded_at = NOW()
       WHERE c.id = ? AND c.instructor_id = ? AND ce.student_id = ? AND ce.status = 'pending'`,
      [req.params.courseId, req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment request not found or already processed' });
    }

    res.json({ message: 'Student enrollment rejected' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reject enrollment', details: e.message });
  }
});

// Remove student from course
router.delete('/instructor/:courseId/students/:studentId', authMiddleware, isInstructor, async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE ce FROM course_enrollments ce
       JOIN courses c ON ce.course_id = c.id
       WHERE c.id = ? AND c.instructor_id = ? AND ce.student_id = ?`,
      [req.params.courseId, req.user.id, req.params.studentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student enrollment not found' });
    }

    res.json({ message: 'Student removed from course' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to remove student', details: e.message });
  }
});

module.exports = router;