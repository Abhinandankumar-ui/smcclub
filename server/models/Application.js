import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  address: { type: String, default: '' },
  course: { type: String, default: '' },
  areaOfInterest: { type: String, default: 'Robotics' },
  whyJoin: { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  adminNotes: { type: String, default: '' },
  promotedToMember: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
