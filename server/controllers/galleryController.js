import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    const items = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadGallery = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    } else if (!data.image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    if (!data.category) {
      data.category = 'Club Activities';
    }
    if (!data.title) {
      data.title = 'Robo-IoT Club';
    }

    const item = await Gallery.create(data);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Gallery item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
