import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import applicationRoutes from './routes/applications.js';
import memberRoutes from './routes/members.js';
import eventRoutes from './routes/events.js';
import galleryRoutes from './routes/gallery.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import projectRoutes from './routes/projects.js';
import settingsRoutes from './routes/settings.js';

import { seedInitialData } from './seedData.js';

dotenv.config();

const app = express();

// ==========================================
// __dirname
// ==========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Upload Directory
// ==========================================
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

console.log('========================================');
console.log('Upload directory:', uploadDir);
console.log('Upload directory exists:', fs.existsSync(uploadDir));
console.log('========================================');

// ==========================================
// Middleware
// ==========================================
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

// ==========================================
// Serve Uploaded Images / Videos
// ==========================================
app.use(
  '/uploads',
  express.static(uploadDir, {
    fallthrough: false
  })
);

// ==========================================
// Routes
// ==========================================
app.use('/api/applications', applicationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);

// ==========================================
// Health Check
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Club API running'
  });
});

// ==========================================
// Upload Test
// ==========================================
app.get('/api/upload-test', (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);

    res.json({
      success: true,
      uploadDir,
      exists: fs.existsSync(uploadDir),
      fileCount: files.length,
      files
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==========================================
// Port
// ==========================================
const PORT = process.env.PORT || 5000;

// ==========================================
// MongoDB + Server
// ==========================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    await seedInitialData();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Uploads available at: /uploads`);
    });
  })
  .catch((err) => {
    console.error('Mongo error:', err.message);
  });
