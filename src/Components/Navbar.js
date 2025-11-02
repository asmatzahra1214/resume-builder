




import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { MdAccountCircle, MdExitToApp, MdLogin } from "react-icons/md";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "ResumeBuilder", path: "/ResumeLanding" },
    { name: "Help", path: "/faqs" },
  ];

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();

      if (data.success) {
        // Clear local storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user');
        
        setUser(null);
        setProfileOpen(false);
        setProfileModalOpen(false);
        navigate('/');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Network error during logout');
    }
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  const handleProfileClick = async (action) => {
    setProfileOpen(false);
    
    if (action === "profile") {
      await fetchCurrentUser();
      
      if (user) {
        setProfileModalOpen(true);
      } else {
        navigate('/login');
      }
    }
  };

  const handleMobileClick = async (path, action) => {
    setOpen(false);
    
    if (action === "profile") {
      await fetchCurrentUser();
      
      if (user) {
        setProfileModalOpen(true);
      } else {
        navigate('/login');
      }
    } else if (action === "logout") {
      await handleLogout();
    } else {
      navigate(path);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user's first letter for avatar
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return <AiOutlineUser className="text-white text-sm" />;
  };

  // Update profile menu based on login status
  const getProfileMenuItems = () => {
    if (user) {
      return [
        { 
          name: "My Profile", 
          icon: <MdAccountCircle className="text-lg" />, 
          action: "profile" 
        },
        { 
          name: "Logout", 
          icon: <MdExitToApp className="text-lg" />, 
          action: "logout" 
        },
      ];
    } else {
      return [
        { 
          name: "Login", 
          icon: <MdLogin className="text-lg" />, 
          path: "/login" 
        },
      ];
    }
  };

  return (
    <nav className="w-full fixed top-0 z-50">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-[#043442] via-[#0f5265] to-[#1a6378] shadow-lg">
        
        {/* Navbar Container */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo with better color */}
          <Link to="/" className="text-2xl font-bold text-white">
            Resume<span className="text-[#4ecdc4]">Builder</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8 font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="text-[#e5e7e7] hover:text-white hover:scale-105 duration-200 transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Profile Icon with Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] hover:from-[#5eddd4] hover:to-[#54b09d] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-white"
              >
                {getUserInitial()}
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                  {/* User Info Section */}
                  {user && (
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  )}
                  
                  {getProfileMenuItems().map((item, index) => (
                    <button
                      key={index}
                      onClick={() => item.action ? handleProfileClick(item.action) : navigate(item.path)}
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-[#f0f7f7] hover:text-[#043442] transition duration-200"
                    >
                      <span className="mr-3 text-[#4ecdc4]">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-[#e5e7e7] hover:text-white transition duration-200"
          >
            {open ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Menu with gradient */}
        {open && (
          <div className="md:hidden bg-gradient-to-b from-[#043442] to-[#1a6378] shadow-xl">
            <ul className="flex flex-col space-y-6 p-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleMobileClick(link.path)}
                    className="text-[#e5e7e7] hover:text-white text-lg font-medium duration-200 block py-2 w-full text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}

              {/* Divider */}
              <hr className="border-[#2a6d7c] my-2" />

              {/* User Info in Mobile */}
              {user && (
                <div className="px-4 py-3 bg-[#2a6d7c] rounded-lg">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-[#e5e7e7] truncate">{user.email}</p>
                </div>
              )}

              {/* Mobile Profile Menu Items */}
              <div className="flex flex-col space-y-4 pt-2">
                {getProfileMenuItems().map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.action ? handleMobileClick(null, item.action) : handleMobileClick(item.path)}
                    className="flex items-center px-4 py-3 text-[#e5e7e7] hover:text-white hover:bg-[#2a6d7c] rounded-lg transition duration-200 w-full text-left"
                  >
                    <span className="mr-3 text-[#4ecdc4]">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </ul>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                <button
                  onClick={() => setProfileModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#043442]"></div>
                </div>
              ) : user ? (
                <div className="space-y-6">
                  {/* User Avatar */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] flex items-center justify-center text-white text-2xl font-bold">
                      {getUserInitial()}
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setProfileModalOpen(false)}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium flex items-center justify-center"
                    >
                      <MdExitToApp className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Please login to view your profile</p>
                  <button
                    onClick={() => {
                      setProfileModalOpen(false);
                      navigate('/login');
                    }}
                    className="bg-[#043442] text-white px-6 py-2 rounded-lg hover:bg-[#032c36] transition duration-200"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;