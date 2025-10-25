import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook

export default function Home() {
  const navigate = useNavigate(); // ✅ initialize navigation

  return (
    <div className="min-h-screen bg-[#e5e7e7] flex flex-col items-center justify-center text-center p-6">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-[#043442] mb-4">
        Welcome to Resume Builder
      </h1>
      <p className="text-gray-700 max-w-md">
        Create your professional resume easily with our simple and elegant Resume Builder. 
        Fill out your details, choose a template, and download your resume instantly.
      </p>

      {/* Buttons Section */}
      <div className="mt-8 flex gap-4">
        {/* ✅ Get Started button (we’ll explain below) */}
        <button
          className="bg-[#043442] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#032c36] transition"
          onClick={() => navigate("/signup")} // 👈 for example
        >
          Get Started
        </button>

        {/* ✅ View Templates button */}
        <button
          className="border-2 border-[#043442] text-[#043442] font-semibold py-2 px-6 rounded-lg hover:bg-[#043442] hover:text-white transition"
          onClick={() => navigate("/templates")} // 👈 navigate to templates
        >
          View Templates
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Resume Builder | Designed by Team
      </footer>
    </div>
  );
}
