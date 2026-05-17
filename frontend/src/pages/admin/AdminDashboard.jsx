import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaRegCalendarAlt, FaChevronDown, FaArrowUp, FaArrowDown, 
  FaRegFileAlt, FaUsers, FaRegEye, FaRegComments, FaRegMoneyBillAlt,
  FaSearch, FaFilter, FaEdit, FaEllipsisV
} from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- MOCK DATA ---
const viewsData = [
  { name: 'May 12', views: 12000 }, { name: 'May 14', views: 21000 },
  { name: 'May 16', views: 18000 }, { name: 'May 19', views: 24000 },
  { name: 'May 21', views: 15000 }, { name: 'May 24', views: 19000 },
  { name: 'May 26', views: 17000 }, { name: 'May 28', views: 28450 },
  { name: 'May 30', views: 22000 }, { name: 'Jun 02', views: 32000 },
  { name: 'Jun 05', views: 26000 }, { name: 'Jun 09', views: 38000 },
  { name: 'Jun 12', views: 42000 },
];

const categoriesData = [
  { name: 'Technology', value: 45, color: '#FF7A00' },
  { name: 'AI', value: 20, color: '#3B82F6' },
  { name: 'Startup', value: 15, color: '#A855F7' },
  { name: 'Marketing', value: 10, color: '#22C55E' },
  { name: 'Others', value: 10, color: '#9CA3AF' },
];

const trafficData = [
  { name: 'Direct', percentage: 45, color: 'bg-orange-500' },
  { name: 'Search Engines', percentage: 30, color: 'bg-orange-500' },
  { name: 'Social Media', percentage: 15, color: 'bg-orange-300' },
  { name: 'Referrals', percentage: 7, color: 'bg-orange-200' },
  { name: 'Others', percentage: 3, color: 'bg-gray-200' },
];

const recentActivity = [
  { type: 'blog', title: 'New blog "AI in 2024" published', time: '2 min ago', icon: '📝', bgColor: 'bg-purple-100', color: 'text-purple-600' },
  { type: 'user', title: 'User John Doe registered', time: '15 min ago', icon: '👤', bgColor: 'bg-green-100', color: 'text-green-600' },
  { type: 'comment', title: 'New comment on "Future of AI"', time: '1 hour ago', icon: '💬', bgColor: 'bg-red-100', color: 'text-red-600' },
  { type: 'blog', title: 'Blog "Startup Ideas" updated', time: '3 hours ago', icon: '📝', bgColor: 'bg-yellow-100', color: 'text-yellow-600' },
  { type: 'user', title: 'User Jane Smith registered', time: '5 hours ago', icon: '👤', bgColor: 'bg-blue-100', color: 'text-blue-600' },
];

const topAuthors = [
  { name: 'Sharon Obrien', posts: 28, views: '12.4K', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Rebecca Bellan', posts: 18, views: '8.7K', avatar: 'https://i.pravatar.cc/150?img=43' },
  { name: 'Sarah Perez', posts: 15, views: '6.1K', avatar: 'https://i.pravatar.cc/150?img=38' },
];

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        let data = await res.json();
        const mappedData = data.map(item => ({...item, id: item._id, author: item.authorName || item.author}));
        mappedData.reverse();
        setBlogs(mappedData);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchBlogs();
    }
  }, [navigate]);

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#F8FAFC]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-500 text-[15px] mt-1">Welcome back, Sharon! Here's what's happening with your blog.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition">
          <FaRegCalendarAlt className="text-gray-400" />
          <span>May 12 - Jun 12, 2024</span>
          <FaChevronDown className="text-gray-400 ml-2" size={12} />
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Blogs */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-orange-100 rounded-xl text-orange-500 flex-shrink-0">
            <FaRegFileAlt size={22} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Blogs</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{blogs.length || 88}</h3>
            <p className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
              <FaArrowUp size={10} /> 12.5% <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 flex-shrink-0">
            <FaUsers size={22} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">1.2K</h3>
            <p className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
              <FaArrowUp size={10} /> 18.7% <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </div>
        </div>

        {/* Monthly Views */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-500 flex-shrink-0">
            <FaRegEye size={22} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Monthly Views</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">24.8K</h3>
            <p className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
              <FaArrowUp size={10} /> 24.3% <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-xl text-green-500 flex-shrink-0">
            <FaRegComments size={22} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Comments</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">320</h3>
            <p className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
              <FaArrowUp size={10} /> 8.1% <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-yellow-100 rounded-xl text-yellow-500 flex-shrink-0">
            <FaRegMoneyBillAlt size={22} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">$430</h3>
            <p className="text-[11px] font-semibold text-green-500 flex items-center gap-1">
              <FaArrowUp size={10} /> 15.2% <span className="text-gray-400 font-medium">from last month</span>
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-1 xl:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6" style={{ gridColumn: 'span 1 / span 1' }}>
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-gray-900">Blog Views</h3>
             <div className="flex items-center gap-1 text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-1 cursor-pointer">
               Last 30 Days <FaChevronDown size={10} className="ml-1" />
             </div>
           </div>
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF7A00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `${value / 1000}K`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#111827', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="views" stroke="#FF7A00" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Categories</h3>
          <div className="flex-1 flex items-center justify-between">
            <div className="w-1/2 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {categoriesData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 font-medium">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    {item.name}
                  </div>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a href="#" className="text-sm font-semibold text-gray-900 hover:text-orange-500 transition-colors flex items-center gap-1">
              View all categories &rarr;
            </a>
          </div>
        </div>

        {/* Traffic Source */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Traffic Source</h3>
          <div className="flex-1 space-y-5">
            {trafficData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-28">{item.name}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="text-sm font-bold text-gray-900 w-8 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
             <a href="#" className="text-sm font-semibold text-gray-900 hover:text-orange-500 transition-colors flex items-center gap-1">
              View full analytics &rarr;
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Blogs Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Blogs</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <FaSearch className="text-gray-400 mr-2" size={14} />
                <input type="text" placeholder="Search blogs..." className="bg-transparent border-none outline-none text-sm w-32 placeholder-gray-400" />
              </div>
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FaFilter className="text-gray-400" size={12} /> Filter
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 border-b border-gray-100 mb-4 pb-2">
            {['All', 'Published', 'Draft', 'Scheduled', 'Archived'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === tab ? 'text-orange-500 border-orange-500' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-bold border-b border-gray-100">
                  <th className="py-3 px-2">Blog</th>
                  <th className="py-3 px-2">Author</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Views</th>
                  <th className="py-3 px-2">Comments</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* Mock rows for aesthetic perfection if blogs are empty, otherwise render real ones */}
                {(blogs.length > 0 ? blogs.slice(0, 5) : Array(5).fill({
                   title: "Consequatur volupta", 
                   author: "Sharon Obrien", 
                   category: "Apps", 
                   status: "Published", 
                   createdAt: new Date().toISOString() 
                })).map((blog, idx) => (
                  <tr key={blog.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                           {blog.image ? <img src={blog.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>}
                        </div>
                        <span className="font-bold text-gray-900 line-clamp-2 max-w-[200px] leading-tight">{blog.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                       <div className="flex items-center gap-2">
                         <img src={`https://i.pravatar.cc/150?img=${40 + idx}`} className="w-6 h-6 rounded-full" />
                         <span className="font-medium text-gray-700 text-xs">{blog.author || 'Author'}</span>
                       </div>
                    </td>
                    <td className="py-3 px-2 text-gray-500 font-medium text-xs">{blog.category || 'Tech'}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${idx % 3 === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {idx % 3 === 1 ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold text-gray-900 text-xs">{(3.4 - (idx*0.5)).toFixed(1)}K</td>
                    <td className="py-3 px-2 font-semibold text-gray-900 text-xs">{24 - (idx*3)}</td>
                    <td className="py-3 px-2 text-gray-500 text-xs font-medium">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</td>
                    <td className="py-3 px-2 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition border border-gray-200">
                           <FaEdit size={12} />
                         </button>
                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition border border-gray-200">
                           <FaEllipsisV size={12} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500 font-medium">
             <p>Showing 1 to 5 of 88 results</p>
             <div className="flex items-center gap-1">
               <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">&lsaquo;</button>
               <button className="w-8 h-8 flex items-center justify-center rounded bg-orange-500 text-white font-bold shadow shadow-orange-500/30">1</button>
               <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-semibold">2</button>
               <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-semibold">3</button>
               <span className="px-1 text-gray-400">...</span>
               <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-semibold">18</button>
               <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold">&rsaquo;</button>
             </div>
          </div>
        </div>

        {/* Activity & Authors Column */}
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
               <a href="#" className="text-xs font-semibold text-gray-500 hover:text-orange-500">View all</a>
             </div>
             <div className="space-y-5">
               {recentActivity.map((activity, idx) => (
                 <div key={idx} className="flex items-start gap-3">
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${activity.bgColor} ${activity.color}`}>
                     {activity.icon}
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-gray-800 leading-tight mb-0.5">{activity.title}</p>
                     <p className="text-xs text-gray-400 font-medium">{activity.time}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Top Authors */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-gray-900">Top Authors</h3>
               <a href="#" className="text-xs font-semibold text-gray-500 hover:text-orange-500">View all</a>
             </div>
             <div className="space-y-4">
               {topAuthors.map((author, idx) => (
                 <div key={idx} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                     <span className="text-sm font-bold text-gray-900">{author.name}</span>
                   </div>
                   <div className="text-right">
                     <p className="text-xs font-semibold text-gray-500">{author.posts} Posts</p>
                     <p className="text-[10px] font-bold text-gray-900 mt-0.5">{author.views} Views</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
