// file path: backend/src/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const rulesRoutes = require('./routes/rules');
const attemptsRoutes = require('./routes/attempts');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/rules', rulesRoutes);
app.use('/api/attempts', attemptsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running at http://localhost:${port}`));
