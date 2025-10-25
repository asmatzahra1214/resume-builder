import React from "react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: "dark",
      name: "Dark Theme",
      desc: "Elegant dark mode resume layout with glowing accents and clean typography — ideal for tech professionals.",
      bgColor: "#1a1a1a",
      textColor: "#ffffff",
      previewColor: "#111827",
      layout: "left", // color block left
    },
    {
      id: "classic",
      name: "Classic Template",
      desc: "A timeless professional layout with neat sections, ideal for corporate or academic resumes.",
      bgColor: "#ffffff",
      textColor: "#043442",
      previewColor: "#e5e7eb",
      layout: "right", // color block right
    },
    {
      id: "minimal",
      name: "Minimal Template",
      desc: "Simple, clean, and distraction-free — perfect for modern creative resumes with focus on content.",
      bgColor: "#f5f5f5",
      textColor: "#043442",
      previewColor: "#d1d5db",
      layout: "center", // center layout
    },
  ];

  return (
    <div className="min-h-screen bg-[#e5e7e7] flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-[#043442] mb-4">Resume Templates</h1>
      <p className="text-gray-700 max-w-2xl text-center mb-10 leading-relaxed">
        Explore different resume styles — from dark and bold to minimal and classic. 
        Each template is crafted for different professional personalities.
      </p>

      <div className="flex flex-col gap-12 w-full max-w-6xl">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className={`flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
              template.layout === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Preview Section */}
            <div
              className="w-full md:w-1/2 h-56 md:h-72 flex items-center justify-center"
              style={{ backgroundColor: template.previewColor, color: template.textColor }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{template.name}</h2>
                <div className="w-32 h-40 bg-white/20 border border-white/30 rounded-md mx-auto"></div>
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col items-center md:items-start text-center md:text-left">
              <h2
                className="text-2xl font-semibold mb-3"
                style={{ color: template.textColor }}
              >
                {template.name}
              </h2>
              <p className="text-gray-600 mb-5">{template.desc}</p>
              <button
                onClick={() => navigate(`/editor/${template.id}`)}
                className="bg-[#043442] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#032c36] transition"
              >
                View Template
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Resume Builder | All Rights Reserved
      </footer>
    </div>
  );
}
