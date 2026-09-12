import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  teamMembers: [{ type: String }],
  domain: { 
    type: String, 
    enum: ['Robotics', 'IoT', 'Embedded Systems', 'AI/ML', 'Automation', 'Drone/CV', 'General'],
    default: 'Robotics'
  },
  featured: { type: Boolean, default: false },
  githubUrl: { type: String, default: '' },
  demoUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
