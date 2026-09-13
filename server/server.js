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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===============================
// Upload directory
// ===============================
const uploadDir = path.join(__dirname, 'uploads');

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads directory created');
}

console.log('Upload directory:', uploadDir);

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// ===============================
// Routes
// ===============================
app.use('/api/applications', applicationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);

// ===============================
// Health check
// ===============================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Club API running'
  });
});

// ===============================
// Port
// ===============================
const PORT = process.env.PORT || 5000;

// ===============================
// MongoDB + Server
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    await seedInitialData();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo error:', err.message);
  });
