import Member from '../models/Member.js';

export const getMembers = async (req, res) => {
  try {
    const { domain, search, isLead } = req.query;
    let query = {};

    if (domain && domain !== 'All') {
      query.technicalDomain = domain;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }
    if (isLead !== undefined) {
      query.isLead = isLead === 'true';
    }

    const members = await Member.find(query).sort({ isLead: -1, order: 1, createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createMember = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photo = '/uploads/' + req.file.filename;
    }
    if (typeof data.socialLinks === 'string') {
      try {
        data.socialLinks = JSON.parse(data.socialLinks);
      } catch {
        data.socialLinks = {};
      }
    }
    if (data.isLead !== undefined) {
      data.isLead = data.isLead === 'true' || data.isLead === true;
    }

    const member = await Member.create(data);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.photo = '/uploads/' + req.file.filename;
    }
    if (typeof data.socialLinks === 'string') {
      try {
        data.socialLinks = JSON.parse(data.socialLinks);
      } catch {
        // preserve existing if parse fails
      }
    }
    if (data.isLead !== undefined) {
      data.isLead = data.isLead === 'true' || data.isLead === true;
    }

    const member = await Member.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
