// routes/photos.js

import express from 'express';
import {
  addPhoto,
  getPhotosByTicketId
} from '../models/photoModel.js';

const router = express.Router();

// CREATE a photo record
router.post('/', async (req, res) => {
  try {
    const photoId = await addPhoto(req.body);
    res.status(201).json({ success: true, photoId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all photos for a specific ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const photos = await getPhotosByTicketId(req.params.ticketId);
    res.json({ success: true, photos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
