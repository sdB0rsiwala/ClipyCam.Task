// routes/notifications.js

import express from 'express';
import {
  addNotification,
  getNotificationsByTicketId
} from '../models/notificationModel.js';

const router = express.Router();

// CREATE a notification
router.post('/', async (req, res) => {
  try {
    const notificationId = await addNotification(req.body);
    res.status(201).json({ success: true, notificationId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET notifications for a specific ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const notifications = await getNotificationsByTicketId(req.params.ticketId);
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
