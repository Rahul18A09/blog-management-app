import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiFileText, FiPieChart, FiMessageSquare, FiCalendar, FiDollarSign, FiSettings, FiSearch, FiBell } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchMessagesCount = async () => {
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

    fetchMessagesCount();
  }, [navigate, location.pathname]); // refetch on navigation

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userToken'); // optional: depending on if we log out of both
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <FiGrid className="text-xl" />, path: '/admin/dashboard' },
    { name: 'My Articles', icon: <FiFileText className="text-xl" />, path: '/admin/dashboard#articles' }, // Using dashboard for now as we don't have separate
    { name: 'Analytics', icon: <FiPieChart className="text-xl" />, path: '/admin/dashboard#analytics' },
    { name: 'Inbox', icon: <FiMessageSquare className="text-xl" />, path: '/admin/messages', count: unreadCount },
    { name: 'Post Plan', icon: <FiCalendar className="text-xl" />, path: '/admin/dashboard#post-plan' },
    { name: 'Earning', icon: <FiDollarSign className="text-xl" />, path: '/admin/dashboard#earning' },
    { name: 'Settings', icon: <FiSettings className="text-xl" />, path: '/admin/dashboard#settings' },
  ];

  return (
    <div className="flex h-screen bg-[#24273E] font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#24273E] text-slate-300 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo Area */}
          <div className="p-6 flex items-center gap-3">
            <div className="bg-[#F8CA54] w-10 h-10 rounded-xl flex items-center justify-center text-[#24273E] font-bold text-xl pb-1">
              {/* Fake logo resembling the yellow ZP icon */}
              Z
              <span className="text-xs absolute mt-6 bg-[#24273E] text-white rounded px-1 transform -rotate-12 translate-x-2 border border-[#24273E]">P</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight tracking-wide">articles</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 px-4 space-y-1">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative
                  ${(isActive && item.name !== 'Dashboard' && item.path === location.pathname) || (item.name === 'Dashboard' && location.pathname === '/admin/dashboard' && !location.hash)
                    ? 'bg-[#FFCFCD] text-[#24273E] font-semibold' 
                    : 'text-slate-400 hover:bg-[#2F3249] hover:text-white'}
                `}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
                {item.count > 0 && (
                  <span className="absolute right-4 bg-red-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-bold">
                    {item.count}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-8 pb-10">
           <button onClick={logout} className="text-slate-500 text-xs hover:text-orange-400 transition w-full text-left">
             Logout
           </button>
           <p className="text-slate-600 text-xs mt-2">Version 1.0.1</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full rounded-l-[40px] bg-white overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.1)] my-2 mr-2 border border-slate-100">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiSearch />
              </span>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border-none rounded-xl text-sm bg-slate-100/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition" 
                placeholder="Search" 
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-4">
            <button className="text-slate-400 hover:text-slate-700 transition relative bg-slate-100 p-2 rounded-xl">
              <FiMessageSquare className="text-lg" />
            </button>
            <button className="text-slate-400 hover:text-slate-700 transition relative bg-slate-100 p-2 rounded-xl">
              <FiBell className="text-lg" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Routes */}
        <div className="flex-1 overflow-auto bg-slate-50 relative">
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;
