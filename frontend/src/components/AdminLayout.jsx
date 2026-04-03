import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserShield, FaUserTie, FaUsers, FaInbox, FaStar, FaCog, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

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

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <MdSpaceDashboard /> },
    { name: 'Inbox', path: '/admin/messages', icon: <FaInbox /> },
    { name: 'Super Admin', path: '/admin/super-admin', icon: <FaUserShield /> },
    { name: 'Subadmin', path: '/admin/subadmin', icon: <FaUserTie /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Popular Author', path: '/admin/popular-author', icon: <FaStar /> },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-white shadow-xl z-50 w-64 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Blog<span className="text-orange-500">Admin</span>
          </h1>
          <button className="lg:hidden text-gray-500 hover:text-red-500" onClick={toggleMobileMenu}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header for Mobile */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between z-30">
          <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
            <FaBars size={24} />
          </button>
          <span className="font-bold text-lg text-gray-800">Admin Panel</span>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
