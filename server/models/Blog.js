import mongoose from 'mongoose';

// Define the schema for the blog posts
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  tags: [String],
  status: { type: String, enum: ['draft', 'published'] },   
  created_at: Date,
  updated_at: Date
});

export default mongoose.model('Blog', blogSchema);
