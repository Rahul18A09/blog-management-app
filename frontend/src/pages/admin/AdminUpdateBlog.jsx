import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AdminUpdateBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    authorName: '',
    authorPic: '',
    published_date: '',
    reading_time: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || '',
            content: data.content || '',
            image: data.image || '',
            category: data.category || '',
            authorName: data.authorName || '',
            authorPic: data.authorPic || '',
            published_date: data.published_date || '',
            reading_time: data.reading_time || '',
            tags: data.tags ? data.tags.join(', ') : ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

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
    setUpdating(true);

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
      setUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t)
    };

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        navigate('/admin/dashboard');
      } else {
        alert("Failed to update blog. Check permissions.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-32">Loading blog details...</div>;

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-extrabold text-[#24273E] tracking-tight mb-8 pb-4 border-b border-slate-100">Update <span className="text-orange-500">Blog</span></h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#24273E] font-semibold mb-2">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-slate-50 focus:bg-white transition" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">Content</label>
              <textarea name="content" required value={formData.content} onChange={handleChange} rows="6" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Image Upload (leave blank to keep current)</label>
              <input type="file" onChange={uploadFileHandler} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              {formData.image && <div className="mt-2"><img src={formData.image} alt="preview" className="h-16 rounded" /></div>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Author Name</label>
              <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
            <button type="submit" disabled={updating} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-orange-500/30 transition ${updating ? 'bg-orange-300' : 'bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5'}`}>
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateBlog;
