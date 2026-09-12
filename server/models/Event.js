import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['Workshop', 'Competition', 'Event', 'Past'],
    default: 'Workshop'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },
  registrationLink: { type: String, default: '' },
  maxSeats: { type: Number, default: 60 },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
