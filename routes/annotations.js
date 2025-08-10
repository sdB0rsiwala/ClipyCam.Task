// routes/annotations.js

import express from 'express';
import {
  addAnnotation,
  getAnnotationsByPhotoId
} from '../models/annotationModel.js';

const router = express.Router();

// CREATE an annotation entry
router.post('/', async (req, res) => {
  try {
    const annotationId = await addAnnotation(req.body);
    res.status(201).json({ success: true, annotationId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET annotations by photo ID
router.get('/photo/:photoId', async (req, res) => {
  try {
    const annotations = await getAnnotationsByPhotoId(req.params.photoId);
    res.json({ success: true, annotations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
