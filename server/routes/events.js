import express from 'express';
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  registerForEvent, 
  getEventRegistrations 
} from '../controllers/eventController.js';
import upload from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', auth, upload.single('image'), createEvent);
router.put('/:id', auth, upload.single('image'), updateEvent);
router.delete('/:id', auth, deleteEvent);

// Public student RSVP / Registration
router.post('/:id/register', registerForEvent);

// Admin view attendee registrations
router.get('/:id/registrations', auth, getEventRegistrations);

export default router;
