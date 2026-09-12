import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
  image:String, category:String, title:String
},{timestamps:true});
export default mongoose.model('Gallery', gallerySchema);
