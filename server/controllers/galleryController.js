import Gallery from '../models/Gallery.js';

export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};


export const uploadGallery = async (req, res) => {
  try {
    console.log('========== GALLERY UPLOAD ==========');
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    console.log('File:', req.file);

    const data = { ...req.body };

    const uploadedFiles = req.files || [];
    const mainFile = req.file || uploadedFiles[0];

    if (mainFile) {
      const isVideo =
        mainFile.mimetype?.startsWith('video/') ||
        /\.(mp4|webm|ogg|mov|m4v|mkv|avi)$/i.test(
          mainFile.originalname
        );

      const filePath = `/uploads/${mainFile.filename}`;

      if (isVideo) {
        data.mediaType = 'video';
        data.videoUrl = filePath;

        // Remove image if accidentally sent
        delete data.image;
      } else {
        data.mediaType = 'image';
        data.image = filePath;

        // Remove video if accidentally sent
        delete data.videoUrl;
      }
    }

    // If a video URL was manually entered
    if (data.videoUrl && !mainFile) {
      data.mediaType = 'video';
    }

    if (!data.image && !data.videoUrl) {
      return res.status(400).json({
        error:
          'Please upload an image/video file or provide a video link'
      });
    }

    if (!data.category) {
      data.category = 'Club Activities';
    }

    if (!data.title) {
      data.title =
        data.mediaType === 'video'
          ? 'Club Video'
          : 'SMC Club';
    }

    if (!data.date) {
      data.date = new Date()
        .toISOString()
        .split('T')[0];
    }

    const item = await Gallery.create(data);

    res.status(201).json(item);

  } catch (err) {
    console.error('Gallery upload error:', err);

    res.status(500).json({
      error: err.message
    });
  }
};


export const uploadGallery = async (req, res) => {
  try {
    console.log('========== GALLERY UPLOAD ==========');
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    console.log('File:', req.file);

    const data = { ...req.body };

    const uploadedFiles = req.files || [];
    const mainFile = req.file || uploadedFiles[0];

    if (mainFile) {
      const isVideo =
        mainFile.mimetype?.startsWith('video/') ||
        /\.(mp4|webm|ogg|mov|m4v|mkv|avi)$/i.test(
          mainFile.originalname
        );

      const filePath = `/uploads/${mainFile.filename}`;

      if (isVideo) {
        item.mediaType = 'video';
        item.videoUrl = filePath;
        item.image = undefined;
      } else {
        item.mediaType = 'image';
        item.image = filePath;
        item.videoUrl = undefined;
      }
    }

    if (data.title !== undefined) {
      item.title = data.title;
    }

    if (data.category !== undefined) {
      item.category = data.category;
    }

    if (data.mediaType !== undefined) {
      item.mediaType = data.mediaType;
    }

    if (data.date !== undefined) {
      item.date = data.date;
    }

    if (data.videoUrl !== undefined && !mainFile) {
      item.videoUrl = data.videoUrl;
      item.mediaType = 'video';
    }

    if (data.image !== undefined && !mainFile) {
      item.image = data.image;
      item.mediaType = 'image';
    }

    await item.save();

    res.json(item);

  } catch (err) {
    console.error('Gallery update error:', err);

    res.status(500).json({
      error: err.message
    });
  }
};


export const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        error: 'Gallery item not found'
      });
    }

    res.json({
      message: 'Gallery item deleted successfully'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
