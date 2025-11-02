import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: '📊',
      label: 'Dashboard',
    },
    {
      path: '/admin/users',
      icon: '👥',
      label: 'Users',
    },
    {
      path: '/admin/resumes',
      icon: '📄',
      label: 'Resumes',
    },
    {
      path: '/admin/templates',
      icon: '🎨',
      label: 'Templates',
    },
    {
      path: '/admin/analytics',
      icon: '📈',
      label: 'Analytics',
    },
    {
      path: '/admin/settings',
      icon: '⚙️',
      label: 'Settings',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`bg-[#043442] text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-[#032c36]">
        {isOpen && (
          <h2 className="text-xl font-bold">Admin Panel</h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-[#032c36] transition"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-[#032c36] text-white'
                    : 'hover:bg-[#032c36] hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#032c36]">
        {isOpen && (
          <p className="text-sm text-gray-300 text-center">
            Resume Builder Admin
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;