import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true }, // e.g. Lead, Hardware Engineer, Research Head
  technicalDomain: { 
    type: String, 
    enum: ['Robotics', 'IoT', 'Embedded Systems', 'AI/ML', 'Automation', 'Drone/CV', 'Core Team'],
    default: 'Robotics'
  },
  email: { type: String, default: '' },
  bio: { type: String, default: '' },
  photo: { type: String, default: '' },
  isLead: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  socialLinks: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' }
  }
}, { timestamps: true });

export default mongoose.model('Member', memberSchema);
