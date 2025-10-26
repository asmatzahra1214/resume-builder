import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { templatesData } from "../data/templateData"; // ✅ Import dummy data file

export default function Templates() {
  const navigate = useNavigate();

  const allTemplates = templatesData; // ✅ Use from data file
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTemplates = allTemplates.filter((t) => {
    const matchesType = filter === "all" || t.id === filter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#e5e7e7] flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-[#043442] mb-4">
        Resume Templates
      </h1>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-5xl justify-center">
        <input
          type="text"
          placeholder="Search template..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
        />

        <div className="flex gap-2 flex-wrap justify-center">
          {["all", ...allTemplates.map((t) => t.id)].slice(0, 5).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === type
                  ? "bg-[#043442] text-white"
                  : "bg-white text-[#043442] border border-[#043442]/30 hover:bg-[#043442]/10"
              }`}
            >
              {type === "all"
                ? "All Templates"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🧩 Templates Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => navigate(`/editor/${template.id}`)}
            className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
          >
            {/* Dummy Resume Preview */}
            <div
              className="h-56 p-4 flex flex-col justify-between"
              style={{
                background: template.previewColor,
                color: template.accent,
              }}
            >
              {/* Name + Title */}
              <div>
                <h3 className="font-bold text-base mb-1">
                  {template.data.name}
                </h3>
                <p className="text-sm opacity-80">{template.data.title}</p>
              </div>

              {/* Skills Bars */}
              <div className="mt-4">
                <div
                  className="w-4/5 h-2 mb-2 rounded"
                  style={{ background: template.accent }}
                ></div>
                <div
                  className="w-3/5 h-2 mb-2 rounded"
                  style={{ background: template.accent }}
                ></div>
                <div
                  className="w-2/5 h-2 mb-2 rounded"
                  style={{ background: template.accent }}
                ></div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-1 text-xs opacity-70 mt-auto">
                <div>📧 {template.data.email}</div>
                <div>📞 {template.data.phone}</div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
              <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
              <button
                onClick={() => navigate(`/editor/${template.id}`)}
                className="bg-[#38bdf8] text-[#0f172a] px-4 py-2 rounded-lg font-semibold hover:bg-[#7dd3fc] transition"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Resume Builder | All Rights Reserved
      </footer>
    </div>
  );
}
