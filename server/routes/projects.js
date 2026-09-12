import express from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', auth, upload.single('image'), createProject);
router.put('/:id', auth, upload.single('image'), updateProject);
router.delete('/:id', auth, deleteProject);

export default router;
