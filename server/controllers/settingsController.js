import ClubInfo from '../models/ClubInfo.js';
import Project from '../models/Project.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import Application from '../models/Application.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await ClubInfo.findOne();
    if (!settings) {
      settings = await ClubInfo.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await ClubInfo.findOne();
    if (!settings) {
      settings = new ClubInfo(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ message: 'Settings updated successfully', settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPublicStats = async (req, res) => {
  try {
    const [projectCount, memberCount, eventCount, applicationCount] = await Promise.all([
      Project.countDocuments(),
      Member.countDocuments(),
      Event.countDocuments(),
      Application.countDocuments({ status: 'Approved' })
    ]);

    const settings = await ClubInfo.findOne();

    res.json({
      projects: projectCount,
      members: memberCount,
      events: eventCount,
      activeInnovators: applicationCount + memberCount,
      customStats: settings?.stats || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
