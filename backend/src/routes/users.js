// file path: backend/src/routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};

// Get all users (admin only)
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT u.id, u.email, u.role, u.full_name, u.created_at, up.experience_level FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id ORDER BY u.created_at DESC'
    );
    res.json({ users });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users', details: e.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT u.id, u.email, u.role, u.full_name, u.created_at, up.* FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?',
      [req.params.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch user', details: e.message });
  }
});

// Create user (admin only)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  const { email, password, role, full_name } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  if (!['student', 'instructor', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES (?, ?, ?, ?)',
      [email, hash, role, full_name || null]
    );

    // Create user profile for non-admin users
    if (role !== 'admin') {
      await pool.query('INSERT INTO user_profiles (user_id) VALUES (?)', [result.insertId]);
    }

    res.json({ message: 'User created successfully', userId: result.insertId });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user', details: e.message });
  }
});

// Update user (admin only)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  const { email, role, full_name, password } = req.body;
  const userId = req.params.id;

  try {
    // Build update query dynamically
    const updates = [];
    const values = [];

    if (email) {
      updates.push('email = ?');
      values.push(email);
    }
    if (role && ['student', 'instructor', 'admin'].includes(role)) {
      updates.push('role = ?');
      values.push(role);
    }
    if (full_name !== undefined) {
      updates.push('full_name = ?');
      values.push(full_name);
    }
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      updates.push('password_hash = ?');
      values.push(hash);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(userId);
    await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ message: 'User updated successfully' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to update user', details: e.message });
  }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  const userId = req.params.id;

  // Prevent deleting yourself
  if (parseInt(userId) === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete your own account' });
  }

  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete user', details: e.message });
  }
});

// Get statistics (admin only)
router.get('/stats/overview', authMiddleware, isAdmin, async (req, res) => {
  try {
    const [studentCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
    const [instructorCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "instructor"');
    const [adminCount] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    const [totalAttempts] = await pool.query('SELECT COUNT(*) as count FROM attempts');

    res.json({
      stats: {
        students: studentCount[0].count,
        instructors: instructorCount[0].count,
        admins: adminCount[0].count,
        total_attempts: totalAttempts[0].count
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: e.message });
  }
});

module.exports = router;