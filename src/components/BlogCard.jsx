import React from 'react';
import { Link } from 'react-router';

export default function BlogCard({ blog, isDraft = false }) {
  const shortDesc = blog.content.replace(/<[^>]+>/g, '').slice(0, 50) + '...';
  const blogTitle = blog.title.length > 30 ? blog.title.slice(0, 20) + '...' : blog.title;

  return (
    <div className="w-80 h-[500px] rounded-md shadow-md bg-white text-gray-900 overflow-hidden">
      <img
        src={blog.image || 'https://source.unsplash.com/301x301/?technology'}
        alt="blog cover"
        className="object-cover w-full h-64 bg-gray-300"
      />
      <div className="flex flex-col justify-between p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{blogTitle}</h2>
          <p className="text-gray-600 text-sm">{shortDesc}</p>
          <p className="text-xs text-gray-500">
            Tags: {blog.tags?.join(', ')}
          </p>
        </div>
        {isDraft ? (
          <Link
            to={`/editor/${blog._id}`}
            className="block w-full text-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            ✏️ Edit Draft
          </Link>
        ) : (
          <Link
            to={`/blog/${blog._id}`}
            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Read More →
          </Link>
        )}
      </div>
    </div>
  );
}
