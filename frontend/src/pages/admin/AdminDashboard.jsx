import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        let data = await res.json();
        const mappedData = data.map(item => ({...item, id: item._id, author: item.authorName || item.author}));
        
        // Sort descending by created date
        mappedData.reverse();

        setBlogs(mappedData);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMessagesCount = async (token) => {
      try {
        const res = await fetch("http://localhost:5000/api/messages", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          const unread = data.filter(msg => !msg.isRead).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error('Error fetching unread messages', error);
      }
    };

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchBlogs();
      fetchMessagesCount(token);
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          setBlogs(blogs.filter(blog => blog.id !== id));
        } else {
          alert("Failed to delete blog. Ensure you are a super admin.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userToken');
    navigate('/admin/login');
  };

  const totalPages = Math.ceil(blogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard <span className="text-orange-500">Overview</span></h2>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-5 bg-white border border-gray-200 shadow-sm py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition">
              <FaArrowLeft className="text-gray-500" /> Go to Website
            </Link>
            <Link to="/admin/create-blog" className="flex items-center gap-2 px-5 text-white transition bg-orange-500 shadow-lg hover:bg-orange-600 py-2.5 rounded-xl font-medium shadow-orange-500/30">
              <span>+</span> New Blog
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 font-medium mb-2">Total Blogs</h3>
            <p className="text-4xl font-extrabold text-gray-800">{blogs.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 font-medium mb-2">Latest Publication</h3>
            <p className="text-xl font-bold text-gray-800 truncate w-full px-4">{blogs.length > 0 ? blogs[0].title : 'None'}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-gray-500 font-medium mb-2">Unread Messages</h3>
            <p className="text-4xl font-extrabold text-blue-600">{unreadCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">Manage Blogs</h3>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading blogs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b">
                  <th className="p-4 border-b rounded-tl-lg">Thumbnail</th>
                  <th className="p-4 border-b">Title</th>
                  <th className="p-4 border-b">Category</th>
                  <th className="p-4 border-b">Author</th>
                  <th className="p-4 border-b text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedBlogs.map(blog => (
                  <tr key={blog.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">
                      {blog.image ? (
                        <img src={blog.image} alt="thumbnail" className="w-16 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                    <td className="p-4 text-gray-600">{blog.category || 'Uncategorized'}</td>
                    <td className="p-4 text-gray-600">{blog.author}</td>
                    <td className="p-4 flex gap-3 justify-center">
                      <Link to={`/admin/update-blog/${blog.id}`} className="text-blue-600 hover:text-blue-800 px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded transition">Edit</Link>
                      <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-800 px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border shadow-sm hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 transition"
                >
                  Prev
                </button>
                <span className="text-gray-600 font-medium bg-gray-100 px-4 py-2 rounded-lg">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border shadow-sm hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
