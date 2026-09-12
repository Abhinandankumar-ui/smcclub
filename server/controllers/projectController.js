import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const { domain, search, featured, limit } = req.query;
    let query = {};

    if (domain && domain !== 'All') {
      query.domain = domain;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    if (featured === 'true') {
      query.featured = true;
    }

    let cursor = Project.find(query).sort({ featured: -1, createdAt: -1 });
    if (limit) {
      cursor = cursor.limit(parseInt(limit));
    }

    const projects = await cursor;
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    if (typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (typeof data.teamMembers === 'string') {
      data.teamMembers = data.teamMembers.split(',').map(m => m.trim()).filter(Boolean);
    }
    if (data.featured !== undefined) {
      data.featured = data.featured === 'true' || data.featured === true;
    }

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    if (typeof data.technologies === 'string') {
      data.technologies = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }
    if (typeof data.teamMembers === 'string') {
      data.teamMembers = data.teamMembers.split(',').map(m => m.trim()).filter(Boolean);
    }
    if (data.featured !== undefined) {
      data.featured = data.featured === 'true' || data.featured === true;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
