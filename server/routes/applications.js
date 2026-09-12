import express from 'express';
import { 
  createApplication, 
  getApplications, 
  getApplicationById, 
  updateApplicationStatus, 
  deleteApplication, 
  checkStatus, 
  promoteToMember 
} from '../controllers/applicationController.js';
import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: student submits application
router.post('/', upload.single('profilePhoto'), createApplication);

// Public: student checks their status
router.get('/check-status', checkStatus);

// Admin: view all applications with filters
router.get('/', auth, getApplications);
router.get('/:id', auth, getApplicationById);

// Admin: update status (Approved, Rejected, Pending) + adminNotes
router.put('/:id/status', auth, updateApplicationStatus);

// Admin: promote approved applicant to member
router.post('/:id/promote', auth, promoteToMember);

// Admin: delete application
router.delete('/:id', auth, deleteApplication);

export default router;
