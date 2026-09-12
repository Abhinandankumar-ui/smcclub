import express from 'express';
import { 
  createEnquiry, 
  getEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry 
} from '../controllers/contactController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', auth, getEnquiries);
router.put('/:id/status', auth, updateEnquiryStatus);
router.delete('/:id', auth, deleteEnquiry);

export default router;
