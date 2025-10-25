import React from "react";

export default function ClassicTemplate({ data }) {
  return (
    <div className="w-[650px] bg-white text-[#043442] border border-gray-200 rounded-2xl shadow-xl overflow-hidden font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#043442] to-[#065a6e] text-white p-8 flex items-center gap-6">
        {data.showPhoto && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            {data.photo ? (
              <img
                src={data.photo}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-white/20">
                {data.name.charAt(0)}
              </div>
            )}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-lg opacity-90">{data.title}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 py-3 px-8 flex flex-wrap justify-between text-sm text-gray-700 border-b border-gray-200">
        <span>📧 {data.email}</span>
        <span>📞 {data.phone}</span>
        <span>📍 {data.location}</span>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        {/* About */}
        <section>
          <h2 className="text-xl font-semibold border-b-2 border-[#043442] pb-1 mb-3">
            Profile Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold border-b-2 border-[#043442] pb-1 mb-3">
            Key Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {Array.isArray(data.skills)
              ? data.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="bg-[#043442]/10 hover:bg-[#043442]/20 transition px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))
              : data.skills
                  .split(",")
                  .map((skill, i) => (
                    <li
                      key={i}
                      className="bg-[#043442]/10 hover:bg-[#043442]/20 transition px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </li>
                  ))}
          </ul>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold border-b-2 border-[#043442] pb-1 mb-3">
            Experience
          </h2>
          {Array.isArray(data.experience) ? (
            data.experience.map((exp, i) => (
              <div
                key={i}
                className="border-l-4 border-[#043442]/70 pl-4 mb-4 hover:bg-gray-50 rounded transition"
              >
                <p className="font-semibold text-[#043442]">
                  {exp.role} – {exp.company}
                </p>
                <p className="text-sm text-gray-600 mb-1">{exp.duration}</p>
                <p className="text-gray-700 text-sm">{exp.details}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">{data.experience}</p>
          )}
        </section>
      </div>
    </div>
  );
}
