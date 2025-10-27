// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { templatesData } from "../data/templateData"; // ✅ Import dummy data file

// export default function Templates() {
//   const navigate = useNavigate();

//   const allTemplates = templatesData; // ✅ Use from data file
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   const filteredTemplates = allTemplates.filter((t) => {
//     const matchesType = filter === "all" || t.id === filter;
//     const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
//     return matchesType && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-[#e5e7e7] flex flex-col items-center p-8">
//       <h1 className="text-4xl font-bold text-[#043442] mb-4">
//         Resume Templates
//       </h1>

//       {/* 🔍 Search + Filter */}
//       <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-5xl justify-center">
//         <input
//           type="text"
//           placeholder="Search template..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
//         />

//         <div className="flex gap-2 flex-wrap justify-center">
//           {["all", ...allTemplates.map((t) => t.id)].slice(0, 5).map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`px-4 py-2 rounded-full font-medium transition-all ${
//                 filter === type
//                   ? "bg-[#043442] text-white"
//                   : "bg-white text-[#043442] border border-[#043442]/30 hover:bg-[#043442]/10"
//               }`}
//             >
//               {type === "all"
//                 ? "All Templates"
//                 : type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 🧩 Templates Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl">
//         {filteredTemplates.map((template) => (
//           <div
//             key={template.id}
//             onClick={() => navigate(`/editor/${template.id}`)}
//             className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
//           >
//             {/* Dummy Resume Preview */}
//             <div
//               className="h-56 p-4 flex flex-col justify-between"
//               style={{
//                 background: template.previewColor,
//                 color: template.accent,
//               }}
//             >
//               {/* Name + Title */}
//               <div>
//                 <h3 className="font-bold text-base mb-1">
//                   {template.data.name}
//                 </h3>
//                 <p className="text-sm opacity-80">{template.data.title}</p>
//               </div>

//               {/* Skills Bars */}
//               <div className="mt-4">
//                 <div
//                   className="w-4/5 h-2 mb-2 rounded"
//                   style={{ background: template.accent }}
//                 ></div>
//                 <div
//                   className="w-3/5 h-2 mb-2 rounded"
//                   style={{ background: template.accent }}
//                 ></div>
//                 <div
//                   className="w-2/5 h-2 mb-2 rounded"
//                   style={{ background: template.accent }}
//                 ></div>
//               </div>

//               {/* Contact Info */}
//               <div className="flex flex-col gap-1 text-xs opacity-70 mt-auto">
//                 <div>📧 {template.data.email}</div>
//                 <div>📞 {template.data.phone}</div>
//               </div>
//             </div>

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
//               <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
//               <button
//                 onClick={() => navigate(`/editor/${template.id}`)}
//                 className="bg-[#38bdf8] text-[#0f172a] px-4 py-2 rounded-lg font-semibold hover:bg-[#7dd3fc] transition"
//               >
//                 Use Template
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <footer className="mt-16 text-gray-500 text-sm text-center">
//         © {new Date().getFullYear()} Resume Builder | All Rights Reserved
//       </footer>
//     </div>
//   );
// }





// 📁 src/components/Templates.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { templatesData } from "../data/templateData";

export default function Templates() {
  const navigate = useNavigate();
  
  const allTemplates = templatesData;
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(allTemplates.map(t => t.category))];

  // Shuffle function for mixed order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const filteredTemplates = useMemo(() => {
    const filtered = allTemplates.filter((t) => {
      const matchesCategory = filter === "all" || t.category === filter;
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Only shuffle when filter is "all"
    if (filter === "all") {
      return shuffleArray(filtered);
    }
    return filtered;
  }, [allTemplates, filter, search]);

  // Different ways to display skills
  const renderSkills = (skills, accent, maxSkills = 4, style = "dots") => {
    const displaySkills = skills.slice(0, maxSkills);
    
    switch(style) {
      case "dots":
        return (
          <div className="space-y-1">
            {displaySkills.map((skill, index) => (
              <div key={skill} className="flex items-center gap-2 text-xs">
                <span 
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: accent }}
                ></span>
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        );
      
      case "arrows":
        return (
          <div className="space-y-1">
            {displaySkills.map((skill, index) => (
              <div key={skill} className="flex items-center gap-2 text-xs">
                <span className="text-xs">→</span>
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        );
      
      case "bullets":
        return (
          <div className="space-y-1">
            {displaySkills.map((skill, index) => (
              <div key={skill} className="flex items-center gap-2 text-xs">
                <span className="text-xs">•</span>
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        );
      
      case "tags":
        return (
          <div className="flex flex-wrap gap-1">
            {displaySkills.map(skill => (
              <span 
                key={skill} 
                className="px-2 py-1 rounded text-[10px] leading-none"
                style={{ 
                  background: accent,
                  color: '#000',
                  opacity: 0.9
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        );

      case "compact":
        return (
          <div className="grid grid-cols-2 gap-1">
            {displaySkills.map(skill => (
              <div key={skill} className="flex items-center gap-1 text-xs">
                <span className="text-[8px]">▪</span>
                <span className="truncate">{skill}</span>
              </div>
            ))}
          </div>
        );

      default:
        return renderSkills(skills, accent, maxSkills, "dots");
    }
  };

  // Render different preview layouts based on template layout type
  const renderTemplatePreview = (template) => {
    const { layout, previewColor, accent, data, category } = template;

    // For dark templates, use white text
    const textColor = category === 'dark' ? '#ffffff' : accent;

    switch(layout) {
      case "professional":
        return (
          <div className="h-80 p-4 flex" style={{ background: previewColor, color: textColor }}>
            {/* Left Sidebar - Profile Section */}
            <div className="w-2/5 pr-3 border-r border-opacity-20 flex flex-col" style={{ borderColor: textColor }}>
              <div className="text-center mb-4">
                <img src={data.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2" style={{ borderColor: textColor }} />
                <h3 className="font-bold text-base mb-1">{data.name}</h3>
                <p className="text-xs opacity-90">{data.title}</p>
              </div>
              
              <div className="space-y-4 text-xs flex-1">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase tracking-wide opacity-80">Contact</div>
                  <div className="space-y-1">
                    <div className="truncate" title={data.email}>📧 {data.email}</div>
                    <div>📞 {data.phone}</div>
                    <div>📍 {data.location}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase tracking-wide opacity-80">Skills</div>
                  <div className="min-h-[60px]">
                    {renderSkills(data.skills, textColor, 4, "dots")}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Professional Details */}
            <div className="w-3/5 pl-3 flex flex-col">
              <div className="space-y-4 text-xs flex-1">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase tracking-wide opacity-80">Experience</div>
                  <div className="space-y-3">
                    {data.experience.slice(0, 2).map((exp, index) => (
                      <div key={index} className="border-l-2 pl-2" style={{ borderColor: textColor }}>
                        <div className="font-medium text-sm">{exp.company}</div>
                        <div className="opacity-80">{exp.role}</div>
                        <div className="opacity-60 text-[10px]">{exp.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase tracking-wide opacity-80">Education</div>
                  <div>
                    <div className="font-medium">{data.education[0].institution}</div>
                    <div className="opacity-80 text-[10px]">{data.education[0].degree}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="h-80 p-4 flex flex-col" style={{ background: previewColor, color: textColor }}>
            {/* Modern Header */}
            <div className="text-center mb-4">
              <h3 className="font-bold text-xl mb-1">{data.name}</h3>
              <p className="text-sm opacity-90 mb-2">{data.title}</p>
              <div className="flex justify-center gap-4 text-xs opacity-80">
                <div className="truncate" title={data.email}>📧 {data.email}</div>
                <div>📞 {data.phone}</div>
              </div>
            </div>
            
            {/* Modern Grid Layout */}
            <div className="grid grid-cols-3 gap-4 flex-1 text-xs">
              <div className="col-span-1 space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[80px]">
                    {renderSkills(data.skills, textColor, 5, "arrows")}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Location</div>
                  <div className="opacity-90">📍 {data.location}</div>
                </div>
              </div>
              
              <div className="col-span-2 space-y-4 border-l pl-4 border-opacity-20" style={{ borderColor: textColor }}>
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                  <div className="space-y-3">
                    {data.experience.slice(0, 1).map((exp, index) => (
                      <div key={index}>
                        <div className="font-medium">{exp.company}</div>
                        <div className="opacity-80">{exp.role}</div>
                        <div className="opacity-60">{exp.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Education</div>
                  <div>
                    <div className="font-medium">{data.education[0].institution}</div>
                    <div className="opacity-80">{data.education[0].degree}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="h-80 p-4 flex" style={{ background: previewColor, color: textColor }}>
            {/* Creative Side Panel */}
            <div className="w-2/5 pr-3 flex flex-col">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 mx-auto mb-3" style={{ borderColor: textColor }}>
                  <img src={data.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg mb-1">{data.name}</h3>
                <p className="text-xs opacity-90">{data.title}</p>
              </div>
              
              <div className="space-y-3 text-xs flex-1">
                <div className="p-2 rounded-lg bg-opacity-10" style={{ background: textColor }}>
                  <div className="truncate" title={data.email}>📧 {data.email}</div>
                </div>
                <div className="p-2 rounded-lg bg-opacity-10" style={{ background: textColor }}>
                  📞 {data.phone}
                </div>
                <div className="p-2 rounded-lg bg-opacity-10" style={{ background: textColor }}>
                  📍 {data.location}
                </div>
                
                <div className="mt-4">
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[60px]">
                    {renderSkills(data.skills, textColor, 4, "compact")}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Creative Content */}
            <div className="w-3/5 pl-3 border-l border-opacity-20 flex flex-col" style={{ borderColor: textColor }}>
              <div className="space-y-4 text-xs flex-1">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">About</div>
                  <div className="leading-relaxed opacity-90">
                    {data.about.substring(0, 100)}...
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                    <div>
                      <div className="font-medium">{data.experience[0].company}</div>
                      <div className="opacity-80 text-[10px]">{data.experience[0].role}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Education</div>
                    <div>
                      <div className="font-medium">{data.education[0].institution}</div>
                      <div className="opacity-80 text-[10px]">{data.education[0].degree}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "executive":
        return (
          <div className="h-80 p-4 flex flex-col" style={{ background: previewColor, color: textColor }}>
            {/* Executive Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl mb-1">{data.name}</h3>
                <p className="text-sm opacity-90">{data.title}</p>
                <div className="text-xs opacity-80 mt-2">
                  <div className="truncate" title={data.email}>📧 {data.email}</div>
                  <div>📞 {data.phone}</div>
                  <div>📍 {data.location}</div>
                </div>
              </div>
              <img src={data.profilePhoto} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: textColor }} />
            </div>
            
            {/* Executive Content */}
            <div className="grid grid-cols-2 gap-6 flex-1 text-xs">
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                  <div className="space-y-3">
                    {data.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="font-medium">{exp.company}</div>
                        <div className="opacity-80">{exp.role}</div>
                        <div className="opacity-60 text-[10px]">{exp.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Education</div>
                  <div>
                    <div className="font-medium">{data.education[0].institution}</div>
                    <div className="opacity-80 text-[10px]">{data.education[0].degree}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[60px]">
                    {renderSkills(data.skills, textColor, 4, "bullets")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="h-80 p-4 flex" style={{ background: previewColor, color: textColor }}>
            {/* Left Side - Profile */}
            <div className="w-2/5 pr-3 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 mb-3" style={{ borderColor: textColor }}>
                <img src={data.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <h3 className="font-bold text-lg mb-1">{data.name}</h3>
              <p className="text-sm opacity-90 mb-3">{data.title}</p>
              
              <div className="text-xs space-y-1 opacity-80">
                <div className="truncate" title={data.email}>📧 {data.email}</div>
                <div>📞 {data.phone}</div>
                <div>📍 {data.location}</div>
              </div>
            </div>
            
            {/* Right Side - Skills and Experience */}
            <div className="w-3/5 pl-3 border-l border-opacity-20 flex flex-col justify-center" style={{ borderColor: textColor }}>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[80px]">
                    {renderSkills(data.skills, textColor, 6, "compact")}
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                  <div>
                    <div className="font-medium">{data.experience[0].company}</div>
                    <div className="opacity-80">{data.experience[0].role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "tech":
        return (
          <div className="h-80 p-4 flex flex-col" style={{ background: previewColor, color: textColor }}>
            {/* Tech Header */}
            <div className="text-center mb-4">
              <h3 className="font-bold text-2xl mb-1">{data.name}</h3>
              <p className="text-sm opacity-90">{data.title}</p>
            </div>
            
            {/* Tech Grid Layout */}
            <div className="grid grid-cols-3 gap-4 flex-1 text-xs">
              <div className="col-span-1 space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Contact</div>
                  <div className="space-y-1">
                    <div className="truncate" title={data.email}>📧 {data.email}</div>
                    <div>📞 {data.phone}</div>
                    <div>📍 {data.location}</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 space-y-4 border-x px-4 border-opacity-20" style={{ borderColor: textColor }}>
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                  <div className="space-y-2">
                    {data.experience.slice(0, 1).map((exp, index) => (
                      <div key={index}>
                        <div className="font-medium">{exp.company}</div>
                        <div className="opacity-80">{exp.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[80px]">
                    {renderSkills(data.skills, textColor, 5, "tags")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-80 p-4 flex flex-col" style={{ background: previewColor, color: textColor }}>
            <div className="flex items-center gap-3 mb-4">
              <img src={data.profilePhoto} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: textColor }} />
              <div>
                <h3 className="font-bold text-lg mb-1">{data.name}</h3>
                <p className="text-sm opacity-90">{data.title}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 flex-1 text-xs">
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Contact</div>
                  <div className="space-y-1">
                    <div className="truncate" title={data.email}>📧 {data.email}</div>
                    <div>📞 {data.phone}</div>
                    <div>📍 {data.location}</div>
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Skills</div>
                  <div className="min-h-[60px]">
                    {renderSkills(data.skills, textColor, 4, "dots")}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Experience</div>
                  <div className="space-y-2">
                    {data.experience.slice(0, 1).map((exp, index) => (
                      <div key={index}>
                        <div className="font-medium">{exp.company}</div>
                        <div className="opacity-80">{exp.role}</div>
                        <div className="opacity-60">{exp.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2 text-[10px] uppercase opacity-80">Education</div>
                  <div>
                    <div className="font-medium">{data.education[0].institution}</div>
                    <div className="opacity-80">{data.education[0].degree}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        AI Resume Templates
      </h1>

      {/* 🔍 Search Bar */}
      <div className="mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search AI resume templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 py-3 border border-gray-200 rounded-xl shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg bg-white"
        />
      </div>

      {/* 🎚️ Filter Buttons */}
      <div className="flex gap-3 mb-12 flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all text-lg ${
              filter === category
                ? "bg-teal-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            {category === "all" 
              ? "All Templates" 
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Template Count */}
      <div className="mb-6 text-gray-600 text-lg">
        Showing {filteredTemplates.length} AI-powered templates
        {filter !== "all" && ` in ${filter}`}
        {search && ` matching "${search}"`}
      </div>

      {/* 🧩 Templates Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => navigate(`/editor/${template.id}`)}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer relative"
          >
            {/* Template Preview */}
            {renderTemplatePreview(template)}

            {/* Hover Overlay - Only Show Use Template Button */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <button 
                className={`px-6 py-3 rounded-lg font-semibold text-base transition shadow-lg ${
                  template.category === 'minimal' 
                    ? 'bg-white text-teal-600 hover:bg-gray-100' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTemplates.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg">No AI templates found matching your criteria.</p>
          <p className="text-sm mt-2">Try changing your search or filter.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} AI Resume Builder | All Rights Reserved
      </footer>
    </div>
  );
}