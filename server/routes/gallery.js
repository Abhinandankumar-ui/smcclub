import express from 'express';

import {
  getGallery,
  uploadGallery,
  updateGallery,
  deleteGallery
} from '../controllers/galleryController.js';

import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all gallery items
router.get('/', getGallery);

// Upload image/video
router.post(
  '/',
  auth,
  upload.any(),
  uploadGallery
);

// Update image/video
router.put(
  '/:id',
  auth,
  upload.any(),
  updateGallery
);

// Delete
router.delete(
  '/:id',
  auth,
  deleteGallery
);

export default router;
