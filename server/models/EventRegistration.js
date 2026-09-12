import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  event: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  studentId: { type: String, default: '' },
  course: { type: String, default: '' },
  technicalDomain: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Waitlisted', 'Cancelled'], 
    default: 'Confirmed' 
  }
}, { timestamps: true });

export default mongoose.model('EventRegistration', eventRegistrationSchema);
