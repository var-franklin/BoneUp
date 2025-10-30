// file path: backend/src/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeAdmin } = require('./utils/initDB');

const authRoutes = require('./routes/auth');
const rulesRoutes = require('./routes/rules');
const attemptsRoutes = require('./routes/attempts');
const usersRoutes = require('./routes/users');
const instructorRoutes = require('./routes/instructor');
const studentRoutes = require('./routes/student');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/rules', rulesRoutes);
app.use('/api/attempts', attemptsRoutes);
app.use('/api/users', usersRoutes);           // Admin only
app.use('/api/instructor', instructorRoutes);  // Instructor only
app.use('/api/student', studentRoutes);        // Student only

const port = process.env.PORT || 4000;

// Initialize database and start server
async function start() {
  await initializeAdmin();
  app.listen(port, () => console.log(`API running at http://localhost:${port}`));
}

start();