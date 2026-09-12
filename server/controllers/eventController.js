import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';

export const getEvents = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      if (category === 'Past Events' || category === 'Past') {
        query.$or = [{ category: 'Past' }, { status: 'Completed' }];
      } else {
        query.category = category;
      }
    }
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query).sort({ date: 1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    if (data.maxSeats) {
      data.maxSeats = parseInt(data.maxSeats);
    }
    const event = await Event.create(data);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    if (data.maxSeats) {
      data.maxSeats = parseInt(data.maxSeats);
    }
    const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    // Also remove registrations for this event
    await EventRegistration.deleteMany({ event: req.params.id });
    res.json({ message: 'Event and associated registrations deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Student registration / RSVP for an event
export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, studentId, course, technicalDomain } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.status === 'Completed') {
      return res.status(400).json({ error: 'Registration is closed. This event has already completed.' });
    }

    // Check if already registered with same email
    const existing = await EventRegistration.findOne({ event: id, email });
    if (existing) {
      return res.status(400).json({ error: 'You are already registered for this event with this email address.' });
    }

    const regStatus = (event.maxSeats && event.registeredCount >= event.maxSeats) ? 'Waitlisted' : 'Confirmed';

    const registration = await EventRegistration.create({
      event: id,
      fullName,
      email,
      phone,
      studentId,
      course,
      technicalDomain,
      status: regStatus
    });

    if (regStatus === 'Confirmed') {
      event.registeredCount = (event.registeredCount || 0) + 1;
      await event.save();
    }

    res.status(201).json({
      message: regStatus === 'Confirmed' ? 'Registration confirmed!' : 'Seats are full. You are on the waitlist.',
      registration,
      status: regStatus
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin view registrations for an event
export const getEventRegistrations = async (req, res) => {
  try {
    const { id } = req.params;
    const registrations = await EventRegistration.find({ event: id }).sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
