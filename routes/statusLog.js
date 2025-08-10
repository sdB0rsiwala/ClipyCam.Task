// routes/statusLog.js

import express from 'express';
import {
  createStatusLog,
  getStatusLogsByTicketId
} from '../models/statusLogModel.js';

const router = express.Router();

// CREATE a new status log entry
router.post('/', async (req, res) => {
  try {
    const logId = await createStatusLog(req.body);
    res.status(201).json({ success: true, logId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all status logs for a specific ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const logs = await getStatusLogsByTicketId(req.params.ticketId);
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
