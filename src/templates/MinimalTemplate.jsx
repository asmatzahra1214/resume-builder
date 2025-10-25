import React from "react";

export default function MinimalTemplate({ data }) {
  return (
    <div className="w-[650px] bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-10 text-[#043442] font-inter border border-gray-200">
      {/* Header Section */}
      <header className="text-center mb-8">
        {data.showPhoto && data.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={data.photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-[#043442]/10"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight">{data.name}</h1>
        <p className="text-lg text-gray-600 font-medium mt-1">{data.title}</p>
      </header>

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-8">
        <span className="flex items-center gap-1">
          <span>📧</span> {data.email}
        </span>
        <span className="flex items-center gap-1">
          <span>📞</span> {data.phone}
        </span>
        <span className="flex items-center gap-1">
          <span>📍</span> {data.location}
        </span>
      </div>

      {/* About Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-[#043442]">💬</span> About Me
        </h2>
        <p className="text-gray-700 leading-relaxed">{data.about}</p>
      </section>

      {/* Skills Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-[#043442]">🧠</span> Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {Array.isArray(data.skills)
            ? data.skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-[#043442]/10 hover:bg-[#043442]/20 transition text-[#043442] font-medium px-4 py-1.5 rounded-full text-sm shadow-sm"
                >
                  {skill}
                </li>
              ))
            : data.skills
                .split(",")
                .map((skill, i) => (
                  <li
                    key={i}
                    className="bg-[#043442]/10 hover:bg-[#043442]/20 transition text-[#043442] font-medium px-4 py-1.5 rounded-full text-sm shadow-sm"
                  >
                    {skill.trim()}
                  </li>
                ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-[#043442]">💼</span> Experience
        </h2>

        {Array.isArray(data.experience) ? (
          data.experience.map((exp, i) => (
            <div
              key={i}
              className="border-l-4 border-[#043442]/60 pl-4 py-2 mb-3 hover:bg-gray-50 rounded transition"
            >
              <p className="font-semibold text-[#043442]">
                {exp.role} – {exp.company}
              </p>
              <p className="text-sm text-gray-600 mb-1">{exp.duration}</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {exp.details}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">{data.experience}</p>
        )}
      </section>
    </div>
  );
}
