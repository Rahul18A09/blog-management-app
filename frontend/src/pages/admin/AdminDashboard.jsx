import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiThumbsUp, FiMessageSquare, FiChevronLeft, FiChevronRight,FiCalendar,FiDollarSign, FiFileText} from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
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

    fetchBlogs();
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
          toast.success("Blog deleted");
        } else {
          toast.error("Failed to delete blog.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const totalPages = Math.ceil(blogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + pageSize);

  const adminUserStr = localStorage.getItem('adminUser');
  const adminName = adminUserStr ? JSON.parse(adminUserStr).username : 'Admin';

  return (
    <div className="p-8 h-full overflow-y-auto">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Content) - Spans 2 cols on large screens */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Welcome Banner */}
          <div className="bg-[#F8CA54] rounded-[32px] p-8 flex justify-between items-center relative overflow-hidden text-[#24273E]">
            <div className="z-10 w-full md:w-3/5">
              <h1 className="text-3xl font-extrabold mb-3">Hello {adminName}!</h1>
              <p className="text-sm font-medium opacity-80 leading-relaxed mb-6">
                Welcome to your dashboard. Manage your articles, track earnings, and stay on top of your content schedule.
              </p>
              <Link to="/admin/create-blog" className="inline-block bg-[#24273E] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                Write new post
              </Link>
            </div>
            {/* Simple decoration to replace illustration */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-9xl opacity-20 rotate-12">
              📝
            </div>
          </div>

          {/* Top Articles Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#24273E] font-serif">Top articles</h2>
              <button className="text-sm text-slate-500 font-medium flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <FiCalendar /> January <span className="text-xs ml-1">▼</span>
              </button>
            </div>

            {loading ? (
              <div className="text-slate-400 py-10">Loading blogs...</div>
            ) : (
              <div className="space-y-4">
                {paginatedBlogs.map((blog, idx) => {
                  const globalIdx = startIndex + idx + 1;
                  return (
                    <div key={blog.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-shadow gap-4">
                      
                      <div className="flex items-center gap-4 flex-1 w-full relative">
                        <span className="text-slate-300 font-medium text-lg w-6">{String(globalIdx).padStart(2, '0')}</span>
                        {blog.image ? (
                           <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-2xl shadow-sm shrink-0" />
                        ) : (
                           <div className="w-16 h-16 bg-orange-100 text-orange-400 rounded-2xl flex items-center justify-center shrink-0">Img</div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 text-md truncate pr-16" style={{maxWidth: '300px'}}>{blog.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-600 font-medium shrink-0">
                        {/* Mock Stats */}
                        <div className="flex items-center gap-1"><FiEye className="text-slate-400" /> {Math.floor(Math.random() * 10) + 1}.{Math.floor(Math.random() * 9)}K</div>
                        <div className="flex items-center gap-1"><FiThumbsUp className="text-slate-400" /> {Math.floor(Math.random() * 5)}.{Math.floor(Math.random() * 9)}K</div>
                         {/* Actions */}
                        <div className="flex items-center gap-2 ml-4 border-l border-slate-200 pl-4">
                          <Link to={`/admin/update-blog/${blog.id}`} className="text-orange-500 hover:text-orange-600 font-semibold px-2 py-1 bg-orange-50 rounded-lg text-xs">Edit</Link>
                          <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg text-xs">Del</button>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Custom Pagination inline to match design (dots/arrows) */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-4">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                       {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                         <button 
                           key={page}
                           onClick={() => setCurrentPage(page)}
                           className={`w-2 h-2 rounded-full ${currentPage === page ? 'bg-[#24273E]' : 'bg-slate-200'}`}
                         />
                       ))}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


        {/* Right Column (Widgets) */}
        <div className="space-y-6">
          
          {/* Earning Card */}
          <div className="bg-[#A4E0E5] rounded-[24px] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#8CCBD0] flex items-center justify-center text-[#24273E] shrink-0">
               <FiDollarSign className="text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#24273E]">$623</h3>
              <p className="text-xs font-semibold text-[#508B90]">Total earning</p>
            </div>
          </div>

          {/* Articles Request Card */}
          <div className="bg-[#C1CAE3] rounded-[24px] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#A9B1CB] flex items-center justify-center text-[#24273E] shrink-0">
               <FiMessageSquare className="text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#24273E]">13</h3>
              <p className="text-xs font-semibold text-[#666D85]">Articles request</p>
            </div>
          </div>

          {/* Pending Articles Card */}
          <div className="bg-[#F3BFC0] rounded-[24px] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#DCA1A2] flex items-center justify-center text-[#24273E] shrink-0">
               <FiFileText className="text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#24273E]">03</h3>
              <p className="text-xs font-semibold text-[#A16F70]">Pending articles</p>
            </div>
          </div>

          {/* Post Plan / Calendar Widget */}
          <div className="bg-[#FDF3DE] rounded-[24px] p-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-sm text-[#24273E]">Today's schedule</h3>
               <button className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-white/50 px-2 py-1 rounded-md">
                <FiCalendar className="text-[10px]" /> Jan <span className="text-[10px] ml-1">▼</span>
               </button>
             </div>
             
             {/* Simple Calendar Strip */}
             <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-6 pb-2 border-b border-[#F0DFBD]">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
             </div>
             <div className="flex justify-between items-center text-xs font-bold text-[#24273E] mb-6">
                <span className="text-slate-400 font-normal">8</span>
                <span className="text-slate-400 font-normal">9</span>
                <span>10</span>
                <span className="bg-[#24273E] text-white w-6 h-6 flex items-center justify-center rounded-full leading-none">11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
             </div>

             {/* Schedule Items */}
             <div className="space-y-4">
               <div className="flex gap-4">
                 <span className="text-xs font-bold text-[#24273E] pt-1">12:30</span>
                 <div>
                   <p className="text-xs font-semibold text-[#24273E] leading-tight">Disney's motion principles in designing interface animations</p>
                   <p className="text-[10px] text-slate-500 mt-1">Assigned by <span className="font-semibold">James K</span></p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <span className="text-xs font-bold text-[#24273E] pt-1">14:15</span>
                 <div>
                   <p className="text-xs font-semibold text-[#24273E] leading-tight">Facebook creates radioactive images and other A.I.</p>
                   <p className="text-[10px] text-slate-500 mt-1">Assigned by <span className="font-semibold">Alexandra</span></p>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
