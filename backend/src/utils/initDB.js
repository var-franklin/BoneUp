// file path: backend/src/utils/initDB.js

const bcrypt = require('bcryptjs');
const pool = require('../db');

async function initializeAdmin() {
  try {
    // Test database connection first
    const connection = await pool.getConnection();
    console.log('✓ Database connection successful');
    connection.release();

    // Check if admin exists
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      ['admin@boneup.com']
    );

    if (existing.length > 0) {
      console.log('✓ Admin account already exists');
      return;
    }

    // Create admin if it doesn't exist
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES (?, ?, ?, ?)',
      ['admin@boneup.com', hash, 'admin', 'System Administrator']
    );

    console.log('✓ Admin account created (admin@boneup.com / admin123)');
  } catch (error) {
    console.error('❌ Error initializing admin:');
    console.error('  Message:', error.message);
    console.error('  Code:', error.code);
    console.error('  Full error:', error);
  }
}

module.exports = { initializeAdmin };