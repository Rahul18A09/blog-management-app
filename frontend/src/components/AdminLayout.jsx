import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaCog, FaBars, FaTimes, FaSignOutAlt, 
  FaChartBar, FaFileAlt, FaTags, FaComments, FaImages, FaUserEdit,
  FaSearch, FaRegBell, FaRegEnvelope, FaSun, FaShieldAlt
} from 'react-icons/fa';
import { MdSpaceDashboard, MdBackup, MdIntegrationInstructions } from 'react-icons/md';
import { IoIosColorFilter } from "react-icons/io";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userToken');
    navigate('/admin/login');
  };

  const mainMenuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <MdSpaceDashboard /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FaChartBar /> },
    { name: 'Blogs', path: '/admin/blogs', icon: <FaFileAlt /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaTags /> },
    { name: 'Comments', path: '/admin/comments', icon: <FaComments /> },
    { name: 'Media Library', path: '/admin/media-library', icon: <FaImages /> },
  ];

  const userMenuItems = [
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Authors', path: '/admin/authors', icon: <FaUserEdit /> },
    { name: 'Roles & Permissions', path: '/admin/roles-permissions', icon: <FaShieldAlt /> },
  ];

  const systemMenuItems = [
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
    { name: 'SEO', path: '/admin/seo', icon: <IoIosColorFilter /> },
    { name: 'Integrations', path: '/admin/integrations', icon: <MdIntegrationInstructions /> },
    { name: 'Backup', path: '/admin/backup', icon: <MdBackup /> },
  ];

  const renderNavItems = (items) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-orange-50 text-orange-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <span className={`text-[18px] ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white border-r border-gray-100 z-50 w-64 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">
            Blog<span className="text-orange-500">Admin</span>
          </h1>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={toggleMobileMenu}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <div className="mb-6">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Main</p>
            {renderNavItems(mainMenuItems)}
          </div>
          <div className="mb-6">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">User Management</p>
            {renderNavItems(userMenuItems)}
          </div>
          <div className="mb-6">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">System</p>
            {renderNavItems(systemMenuItems)}
          </div>
          
          {/* Upgrade Card */}
          <div className="mt-8 mb-4 px-4">
            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-orange-100 rounded-lg text-orange-500">
                  <FaChartBar size={14} />
                </div>
                <span className="font-bold text-gray-900 text-sm">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Unlock powerful features and advanced analytics.</p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </nav>

        {/* User Profile Block */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors relative group">
            <img 
              src="https://i.pravatar.cc/150?img=47" 
              alt="User" 
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">Sharon Obrien</p>
              <p className="text-xs text-gray-500 truncate">Super Admin</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FaBars size={14} />
            </button>
            
            {/* Popover Logout - shown on hover */}
            <div className="absolute bottom-full left-0 w-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
               <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-100 shadow-lg text-red-600 hover:bg-red-50 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  <FaSignOutAlt /> Logout
                </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-100 h-[72px] flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={toggleMobileMenu} className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
              <FaBars size={20} />
            </button>
            
            {/* Search Input */}
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
              <FaSearch className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search blogs, authors, categories..." 
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
              <div className="ml-2 flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <FaSun size={18} />
            </button>
            
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <FaRegBell size={18} />
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <FaRegEnvelope size={18} />
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">5</span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="https://i.pravatar.cc/150?img=47" 
                alt="User Profile" 
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-900 leading-none mb-1">Sharon Obrien</p>
                <p className="text-[11px] text-gray-500 leading-none">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
