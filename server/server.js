import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
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

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req,res)=>res.json({status:'ok', message:'Club API running'}));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(async ()=>{
  console.log('MongoDB connected');
  await seedInitialData();
  app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}`));
}).catch(err=>console.error('Mongo error:',err.message));

