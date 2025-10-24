import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Templates", href: "#templates" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          Resume<span className="text-yellow-500">Builder</span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="hover:text-blue-600 duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
            Login
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200">
            Sign Up
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-700"
        >
          {open ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-white flex flex-col space-y-4 p-6 text-gray-800 font-medium shadow-lg">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="hover:text-blue-600 duration-200"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}

          <hr />

          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200">
            Login
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200">
            Sign Up
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
