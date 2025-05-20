import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://blogapp-fnj5.onrender.com/api/blogs/${id}`).then(res => setBlog(res.data)); // Fetch blog details using specified ID
  }, [id]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {blog && (
        <>
          <img src={blog.image} alt="Blog Image" />
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="mb-4 text-gray-600">Tags: {blog.tags?.join(', ')}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </>
      )}
    </div>
  );
}
