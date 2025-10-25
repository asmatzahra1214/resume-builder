import React from "react";

export default function DarkTemplate({ data }) {
  return (
    <div className="w-[600px] bg-[#0f172a] text-[#e2e8f0] shadow-xl rounded-lg p-8 font-sans">
      <h1 className="text-3xl font-bold mb-1 text-[#38bdf8]">{data.name}</h1>
      <p className="text-lg font-medium text-[#94a3b8] mb-4">{data.title}</p>

      <p className="text-sm text-gray-400 mb-4">
        📧 {data.email} | 📞 {data.phone} | 📍 {data.location}
      </p>

      <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
        About Me
      </h2>
      <p className="text-gray-300 mb-4">{data.about}</p>

      <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
        Skills
      </h2>
      <ul className="flex flex-wrap gap-2 mb-4">
        {data.skills.map((skill, i) => (
          <li
            key={i}
            className="bg-[#1e293b] text-[#e2e8f0] px-3 py-1 rounded-md text-sm border border-[#38bdf8]/30"
          >
            {skill}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
        Experience
      </h2>
      {data.experience.map((exp, i) => (
        <div key={i} className="mb-3">
          <p className="font-semibold text-[#e2e8f0]">
            {exp.role} – {exp.company}
          </p>
          <p className="text-sm text-gray-400">{exp.duration}</p>
          <p className="text-gray-300">{exp.details}</p>
        </div>
      ))}
    </div>
  );
}
