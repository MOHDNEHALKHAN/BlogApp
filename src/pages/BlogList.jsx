import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import BlogCard from '../components/BlogCard';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('https://blogapp-fnj5.onrender.com/api/blogs').then(res => { // Fetch all blogs from the server
      setBlogs(res.data);
    });
  }, []);

  const published = blogs.filter(b => b.status === 'published');
  const drafts = blogs.filter(b => b.status === 'draft');

  return (
    <div className="bg-gray-700 w-full mx-auto px-4 py-6 justify-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1 text-white">All Blogs</h1>
        <Link to="/editor" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Blog
        </Link>
      </div>

      <h2 className="text-xl font-semibold ml-5 mb-2 text-white">Published Blogs</h2>
      <div className="flex flex-row max-sm:flex-col gap-4 space-y-4 ml-5 mb-8 justify-start">
        {published.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <h2 className="text-xl font-semibold ml-5 mb-2 text-white">Drafts</h2>
      <div className="flex flex-row max-sm:flex-col gap-4 ml-5 space-y-4 justify-start">
        {drafts.map(blog => (
          <BlogCard key={blog._id} blog={blog} isDraft />
        ))}
      </div>
    </div>
  );
}
