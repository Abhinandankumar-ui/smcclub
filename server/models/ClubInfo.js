import mongoose from 'mongoose';

const clubInfoSchema = new mongoose.Schema({
  hero: {
    badge: { type: String, default: 'Welcome to Robo-IoT Club • Hardware & Intelligence' },
    titlePrefix: { type: String, default: 'Innovating at the Core of' },
    titleHighlight: { type: String, default: 'Robotics & IoT' },
    description: { 
      type: String, 
      default: 'A premier multidisciplinary hub for engineering enthusiasts passionate about autonomous robotics, embedded microelectronics, telemetry, and intelligent cyber-physical systems.' 
    }
  },
  stats: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
      icon: { type: String, default: '⚡' }
    }
  ],
  domains: [
    {
      title: { type: String, required: true },
      icon: { type: String, default: '🦾' },
      badge: { type: String, default: 'Engineering' },
      desc: { type: String, required: true },
      topics: [{ type: String }],
      color: { type: String, default: 'from-violet-500/20 to-purple-500/10' },
      border: { type: String, default: 'border-violet-500/30' }
    }
  ],
  activities: [
    {
      title: { type: String, required: true },
      icon: { type: String, default: '🛠️' },
      desc: { type: String, required: true }
    }
  ],
  mission: {
    type: String,
    default: 'To provide every engineering student with the tools, lab components, and collaborative ecosystem needed to transition from theoretical textbook knowledge to building real-world robots, smart IoT devices, and autonomous cyber-physical systems.'
  },
  vision: {
    type: String,
    default: 'To establish an internationally recognized student hardware research collective producing open-source robotics innovations, high-impact telemetry research, and entrepreneurial deep-tech ventures.'
  },
  labInfo: {
    location: { type: String, default: 'Robotics & IoT R&D Lab, Room 304, Engineering Tech Block' },
    email: { type: String, default: 'robo-iot@university.edu' },
    phone: { type: String, default: '+91 98765 43210' },
    timings: { type: String, default: 'Monday – Saturday: 9:00 AM – 7:00 PM (Project sprints open 24/7)' }
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    discord: { type: String, default: 'https://discord.com' }
  }
}, { timestamps: true });

export default mongoose.model('ClubInfo', clubInfoSchema);
