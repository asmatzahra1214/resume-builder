import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { MdAccountCircle, MdExitToApp, MdLogin } from "react-icons/md";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const profileMenuItems = [
    { name: "My Profile", icon: <MdAccountCircle className="text-lg" />, path: "/profile" },
    { name: "Login", icon: <MdLogin className="text-lg" />, path: "/login" },
    { name: "Logout", icon: <MdExitToApp className="text-lg" />, path: "/logout" },
  ];

  const handleProfileClick = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  const handleMobileClick = (path) => {
    setOpen(false);
    navigate(path);
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
          <div className="hidden md:block relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] hover:from-[#5eddd4] hover:to-[#54b09d] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <AiOutlineUser className="text-white text-lg" />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleProfileClick(item.path)}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-[#f0f7f7] hover:text-[#043442] transition duration-200"
                  >
                    <span className="mr-3 text-[#4ecdc4]">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
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

              {/* Mobile Profile Menu Items */}
              <div className="flex flex-col space-y-4 pt-2">
                {profileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMobileClick(item.path)}
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
    </nav>
  );
};

export default Navbar;