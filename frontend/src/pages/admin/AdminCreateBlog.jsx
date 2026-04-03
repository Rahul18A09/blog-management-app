import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminCreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    authorName: '',
    authorPic: 'author1.jpg',
    published_date: new Date().toISOString().split('T')[0],
    reading_time: '5 minutes',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (res.ok) {
        const url = await res.text();
        setFormData(prev => ({ ...prev, image: `http://localhost:5000${url}` }));
      } else {
        alert("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during upload");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t)
    };

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        alert("Failed to create blog. Check permissions.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 border-t-4 border-orange-500">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10">
        <div className="flex justify-between items-center pb-6 mb-8 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create New <span className="text-orange-500">Blog</span></h2>
          <Link to="/admin/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Blog Title" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Content</label>
              <textarea name="content" required value={formData.content} onChange={handleChange} rows="6" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Write your blog content here..."></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Image Upload</label>
              <input type="file" onChange={uploadFileHandler} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              {formData.image && <p className="text-xs text-green-600 mt-1">Image uploaded successfully</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. Technology" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Author Name</label>
              <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Your Name" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Tech, Startups, Growth" />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-orange-500/30 transition ${loading ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5'}`}>
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateBlog;
