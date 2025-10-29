// 📁 src/pages/ResumeLanding.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeLanding() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-black/50 p-10 rounded-2xl text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">
          AI-Powered Resume & Job Builder
        </h1>
        <p className="text-lg mb-6 text-gray-200">
          Create a standout professional resume or enhance your existing one
          using advanced AI technology — fast, smart, and effortless.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 bg-white text-[#043442] font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Upload Existing Resume
          </button>
          <button
            onClick={() => navigate("/create")}
            className="px-6 py-3 bg-[#043442] text-white font-semibold rounded-lg shadow hover:bg-[#064e63] transition"
          >
            Create New Resume
          </button>
        </div>
      </div>
    </div>
  );
}
