import express from 'express';
import { getSettings, updateSettings, getPublicStats } from '../controllers/settingsController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: get club settings (hero, domains, stats, labInfo)
router.get('/', getSettings);

// Public: get live count metrics
router.get('/metrics', getPublicStats);

// Admin: update club settings
router.put('/', auth, updateSettings);

export default router;
