import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors';
import Blog from './models/Blog.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // here to specify the origin of the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
console.log('Connected to MongoDB');

//Rest API post method to save a draft
app.post('/api/blogs/save-draft', async (req, res) => {  
  const { id, title, content, image, tags } = req.body;
  const data = { title, content, image, tags, status: 'draft', updated_at: new Date() };
  let blog;
  if (id) {
    blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  } else {
    blog = await Blog.create({ ...data, created_at: new Date() });
  }
  res.json(blog);
});

//Rest API post method to publish a blog
app.post('/api/blogs/publish', async (req, res) => {  //
  const { id, title, content , image, tags } = req.body;
  const data = { title, content, image, tags, status: 'published', updated_at: new Date() };
  let blog;
  if (id) {
    blog = await Blog.findByIdAndUpdate(id, data, { new: true });
  } else {
    blog = await Blog.create({ ...data, created_at: new Date() });
  }
  res.json(blog);
});

//Rest API get method to fetch all blogs in from the database
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

//Rest API get method to fetch a single blog from the database
app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// express server listening on port 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
