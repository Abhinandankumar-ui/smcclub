import express from 'express';
import { login, getDashboardStats, initAdmin } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/stats', auth, getDashboardStats);
router.post('/init', initAdmin);

export default router;
