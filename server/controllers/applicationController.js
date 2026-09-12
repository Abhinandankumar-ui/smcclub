import Application from '../models/Application.js';
import Member from '../models/Member.js';

export const createApplication = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.profilePhoto = '/uploads/' + req.file.filename;
    }
    const app = await Application.create(data);
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } }
      ];
    }
    const applications = await Application.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const app = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public status check by email or phone
export const checkStatus = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Please enter your registered email or phone' });
    }

    const trimmed = query.trim();
    const app = await Application.findOne({
      $or: [
        { email: trimmed.toLowerCase() },
        { phone: trimmed }
      ]
    }).sort({ createdAt: -1 });

    if (!app) {
      return res.status(404).json({ message: 'No application found with this email or phone.' });
    }

    res.json({
      fullName: app.fullName,
      status: app.status,
      appliedAt: app.createdAt,
      areaOfInterest: app.areaOfInterest,
      adminNotes: app.adminNotes || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Promote approved applicant directly to club member
export const promoteToMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { designation } = req.body;

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ error: 'Application not found' });

    // Check if already promoted
    if (app.promotedToMember) {
      return res.status(400).json({ error: 'This applicant has already been promoted to member.' });
    }

    // Map applicant areaOfInterest to member technicalDomain
    let domain = 'Robotics';
    if (app.areaOfInterest) {
      if (app.areaOfInterest.includes('IoT')) domain = 'IoT';
      else if (app.areaOfInterest.includes('Embedded')) domain = 'Embedded Systems';
      else if (app.areaOfInterest.includes('AI') || app.areaOfInterest.includes('ML')) domain = 'AI/ML';
      else if (app.areaOfInterest.includes('Automation')) domain = 'Automation';
      else if (app.areaOfInterest.includes('Drone')) domain = 'Drone/CV';
    }

    const newMember = await Member.create({
      name: app.fullName,
      designation: designation || 'Club Engineer',
      technicalDomain: domain,
      email: app.email,
      bio: app.whyJoin || 'Joined via online club application.',
      photo: app.profilePhoto || '',
      isLead: false
    });

    app.status = 'Approved';
    app.promotedToMember = true;
    await app.save();

    res.json({
      message: `${app.fullName} has been successfully promoted to Club Member!`,
      member: newMember,
      application: app
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
