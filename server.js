// app.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {pool} from './config/db.js';

// Route files
import ticketRoutes from './routes/tickets.js';
import photoRoutes from './routes/photos.js';
import annotationRoutes from './routes/annotations.js';
import notificationRoutes from './routes/notifications.js';
import statusLogRoutes from './routes/ticketStatusLog.js'; 
import progressRoutes from './routes/progressUpdates.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('ClipyCam.Task API is running ✅');
});

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/annotations', annotationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/status-logs', statusLogRoutes);
app.use('/api/progress', progressRoutes);

// DB Test Route (Optional)
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ connected: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
