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
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-extrabold text-[#24273E] tracking-tight mb-8 pb-4 border-b border-slate-100">Create New <span className="text-orange-500">Blog</span></h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#24273E] font-semibold mb-2">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-slate-50 focus:bg-white transition" placeholder="Blog Title" />
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
