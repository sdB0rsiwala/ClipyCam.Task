// routes/progressUpdates.js

import express from 'express';
import {
  createProgressUpdate,
  getProgressUpdatesByTicketId
} from '../models/progressModel.js';

const router = express.Router();

// CREATE a progress update entry
router.post('/', async (req, res) => {
  try {
    const updateId = await createProgressUpdate(req.body);
    res.status(201).json({ success: true, updateId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all progress updates for a specific ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const updates = await getProgressUpdatesByTicketId(req.params.ticketId);
    res.json({ success: true, updates });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
