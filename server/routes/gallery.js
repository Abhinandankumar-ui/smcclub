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

router.get('/', getGallery);

// Accept any file field name: image, media, video, etc.
router.post('/', auth, upload.any(), uploadGallery);

router.put('/:id', auth, upload.any(), updateGallery);

router.delete('/:id', auth, deleteGallery);

export default router;
