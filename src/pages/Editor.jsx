import React, { useEffect, useState, useRef , useCallback} from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Toast from '../components/Toast';

export default function Editor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  // const [toast, setToast] = useState('');
  const [toast, setToast] = useState(null); // will hold { message, key }

  const [blogId, setBlogId] = useState(id || null); // Track the draft's ID
  const timeoutRef = useRef();
  const navigate = useNavigate();

  // Load blog if editing
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/blogs/${id}`).then(res => {
        setTitle(res.data.title);
        setTags(res.data.tags.join(', '));
        setImage(res.data.image);
        setContent(res.data.content);
        setBlogId(res.data._id); // Make sure we track the correct ID
      });
    }
  }, [id]);

  // Auto-save with debounce (5s)
  const saveDraft = useCallback(async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/blogs/save-draft', {
        id: blogId,
        title,
        tags: tags.split(',').map(t => t.trim()),
        content,
        image,
      });

      if (!blogId) {
        setBlogId(res.data._id); // Store the ID for future updates
      }
       setToast({ message: 'Draft auto-saved', key: Date.now() });

    } catch {
      setToast({ message: 'Failed to save draft', key: Date.now() });
    }
  }, [blogId, title, tags, image,content]);

  useEffect(() => {
    if (title || tags || content) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        saveDraft();
      }, 5000);
    }
  }, [title, tags, image, content, saveDraft]);

  const handleSaveClick = () => {
    saveDraft(); // Manual save
    setTimeout(() => navigate('/'), 2000);
  };

  // Publish the blog
  const publish = async () => {
     if (!title.trim() || !content.trim() || !tags.trim()) {
    setToast({ message: 'Please fill out all required fields.', key: Date.now() });
    return;
  }
    try {
      await axios.post('http://localhost:3000/api/blogs/publish', { // rest API post method to publish a blog
        id: blogId,
        title,
        image,
        tags: tags.split(',').map(t => t.trim()),
        content,
      });
// Clear the form fields after publishing
      setTitle('');
      setTags('');
      setImage('');
      setContent('');
      setBlogId(null);
      setToast({ message: 'Blog published!', key: Date.now() });
      setTimeout(() => navigate('/'), 2000); // redirect to bloglist page after 2 seconds
    } catch {
;
      setToast({ message: 'Failed to publish blog', key: Date.now() });


    }
  };

  return (
    <div className="bg-slate-800 w-full mx-auto px-4 py-6">
    <div className="bg-slate-800 max-w-4xl mx-auto p-4">
      <input
        className="w-full p-2 rounded-sm border mb-2 text-white"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 rounded-sm border mb-4 text-white"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
       className="w-full p-2 rounded-sm border mb-4 text-white"
       placeholder="Image URL"
       value={image}
       onChange={(e) => setImage(e.target.value)}
       />
      <TinyEditor
        value={content}
        onEditorChange={(value) => setContent(value)}
        apiKey='99hp8co808tt9lcswiwpeu7nh3dtz3bqbbjtuzilhbxc8ttr'
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          height: 400,
          branding: false
        }}
        initialValue=""
      />
      <div className="mt-4 flex gap-4">
        <button onClick={handleSaveClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Draft
        </button>
        <button onClick={publish} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Publish
        </button>
      </div>
      {toast && <Toast key={toast.key} message={toast.message} />}
    </div>
    </div>
  );
}
