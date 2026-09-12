import Admin from '../models/Admin.js';
import Application from '../models/Application.js';
import Member from '../models/Member.js';
import Event from '../models/Event.js';
import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';
import Enquiry from '../models/Enquiry.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'club_secret_default',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      admin: { id: admin._id, email: admin.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalApps,
      pendingApps,
      approvedApps,
      rejectedApps,
      totalMembers,
      totalProjects,
      totalEvents,
      totalGallery,
      totalEnquiries,
      unreadEnquiries,
      recentApps,
      recentEnquiries
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'Pending' }),
      Application.countDocuments({ status: 'Approved' }),
      Application.countDocuments({ status: 'Rejected' }),
      Member.countDocuments(),
      Project.countDocuments(),
      Event.countDocuments(),
      Gallery.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'Unread' }),
      Application.find().sort({ createdAt: -1 }).limit(6),
      Enquiry.find().sort({ createdAt: -1 }).limit(5)
    ]);

    res.json({
      total: totalApps,
      pending: pendingApps,
      approved: approvedApps,
      rejected: rejectedApps,
      members: totalMembers,
      projects: totalProjects,
      events: totalEvents,
      gallery: totalGallery,
      enquiries: totalEnquiries,
      unreadEnquiries,
      recent: recentApps,
      recentEnquiries
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const initAdmin = async (req, res) => {
  try {
    const email = 'smcc@admin.com';
    const hash = await bcrypt.hash('smccadmin99', 10);
    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = hash;
      await admin.save();
      return res.json({ message: 'Admin verified: ' + email });
    }
    admin = await Admin.create({ email, password: hash });
    res.json({ message: 'Admin created: ' + email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
