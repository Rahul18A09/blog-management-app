import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin <span className="text-orange-500">Dashboard</span></h2>
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition mr-2 hidden sm:block">
              &larr; Public Site
            </Link>
            <Link to="/admin/messages" className="bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30 text-white px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 relative">
              <span>📥</span> Inbox
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm shadow-red-500">{unreadCount > 99 ? '99+' : unreadCount}</span>
              )}
            </Link>
            <Link to="/admin/create-blog" className="bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30 text-white px-5 py-2.5 rounded-xl font-medium transition">
              + New Blog
            </Link>
            <button onClick={logout} className="bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-xl font-medium transition">
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">

        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading blogs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b">
                  <th className="p-4 border-b">Thumbnail</th>
                  <th className="p-4 border-b">Title</th>
                  <th className="p-4 border-b">Category</th>
                  <th className="p-4 border-b">Author</th>
                  <th className="p-4 border-b text-center">Actions</th>
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
