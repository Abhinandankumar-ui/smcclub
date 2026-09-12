import express from 'express';
import { getGallery, uploadGallery, deleteGallery } from '../controllers/galleryController.js';
import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', auth, upload.single('image'), uploadGallery);
router.delete('/:id', auth, deleteGallery);

export default router;
