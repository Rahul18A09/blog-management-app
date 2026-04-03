import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch("http://localhost:5000/api/messages", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setMessages(data);

          // Mark as read in the background if there are unread messages
          const hasUnread = data.some(msg => !msg.isRead);
          if (hasUnread) {
            try {
              await fetch("http://localhost:5000/api/messages/mark-read", {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
              });
            } catch (err) {
              console.error("Failed to mark messages as read");
            }
          }
        } else {
          toast.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error('Error fetching messages', error);
        toast.error("Network error while picking up messages");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchMessages();
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          setMessages(messages.filter(msg => msg._id !== id));
          toast.success("Message deleted");
        } else {
          toast.error("Failed to delete message. Ensure you are an admin.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error deleting message");
      }
    }
  };



  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin <span className="text-orange-500">Inbox</span></h2>
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/admin/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition mr-2 hidden sm:block">
              &larr; Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading inbox...</div>
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl block mb-4">📭</span>
              <h3 className="text-xl font-bold text-gray-700">Inbox is empty</h3>
              <p className="text-gray-500 mt-2">You don't have any new messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map(msg => (
                <div key={msg._id} className={`border rounded-xl p-6 transition shadow-sm relative group ${msg.isRead ? 'bg-gray-50/50 border-gray-100 hover:bg-white' : 'bg-white border-orange-200 shadow-md'}`}>
                  {!msg.isRead && (
                    <span className="absolute -top-3 -left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">New</span>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{msg.subject}</h4>
                      <p className="text-sm font-medium text-orange-600">{msg.name} <span className="text-gray-400 font-normal">({msg.email})</span></p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs text-gray-500 mb-2">{new Date(msg.createdAt).toLocaleString()}</span>
                      <button 
                        onClick={() => handleDelete(msg._id)} 
                        className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 p-4 rounded-lg text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
