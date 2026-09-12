import express from 'express';
import { 
  getMembers, 
  getMemberById, 
  createMember, 
  updateMember, 
  deleteMember 
} from '../controllers/memberController.js';
import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/', auth, upload.single('photo'), createMember);
router.put('/:id', auth, upload.single('photo'), updateMember);
router.delete('/:id', auth, deleteMember);

export default router;
