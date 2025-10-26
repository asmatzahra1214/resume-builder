import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import DarkTemplate from "../templates/DarkTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";

export default function Editor() {
  const { id } = useParams();
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to build your resume!");
      navigate("/login");
    }
  }, [navigate]);

  const [data, setData] = useState({
    name: "Zulqarnain Malik",
    title: "Frontend Developer",
    email: "zulqarnain@example.com",
    phone: "+92 300 1234567",
    location: "Lahore, Pakistan",
    about:
      "I am a passionate frontend developer skilled in React, Tailwind, and JavaScript. I love building modern, user-friendly web apps.",
    skills: "React, JavaScript, Tailwind CSS, Git, Vite",
    experience:
      "Frontend Intern at CodeSoft (2024 - 2025) - Developed UI with React and Tailwind.",
    photo: "",
    showPhoto: true,
  });

  // ✅ Handle all text input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Upload image & convert to Base64
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, photo: reader.result, showPhoto: true }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePhoto = () => {
    setData((prev) => ({ ...prev, showPhoto: !prev.showPhoto }));
  };

  // ✅ Save to localStorage
  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(data));
    alert("✅ Resume saved successfully!");
  };

  // ✅ Download PDF
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${data.name.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  // ✅ Download Image
  const handleDownloadImage = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    canvas.toBlob((blob) => {
      saveAs(blob, `${data.name.replace(/\s+/g, "_")}_Resume.png`);
    });
  };

  // ✅ Download DOCX (optional)
  const handleDownloadDOCX = () => {
    const content = `
      Name: ${data.name}\n
      Title: ${data.title}\n
      Email: ${data.email}\n
      Phone: ${data.phone}\n
      Location: ${data.location}\n
      About: ${data.about}\n
      Skills: ${data.skills}\n
      Experience:\n${data.experience}
    `;
    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, `${data.name.replace(/\s+/g, "_")}_Resume.docx`);
  };

  // ✅ Format data for templates
  const formattedData = {
    ...data,
    skills: Array.isArray(data.skills)
      ? data.skills
      : data.skills.split(",").map((s) => s.trim()),
    experience: Array.isArray(data.experience)
      ? data.experience
      : data.experience.split("\n").map((exp) => exp.trim()),
  };

  // ✅ Choose template
  const renderTemplate = () => {
    switch (id) {
      case "dark":
        return <DarkTemplate data={formattedData} />;
      case "classic":
        return <ClassicTemplate data={formattedData} />;
      default:
        return <MinimalTemplate data={formattedData} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7e7] flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-[#043442] mb-6">
        Editing: {id.charAt(0).toUpperCase() + id.slice(1)} Template
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {/* 🧾 Left Form */}
        <div className="w-80 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#043442]">Edit Info</h2>

          {data.photo && data.showPhoto && (
            <img
              src={data.photo}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border"
            />
          )}

          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">Phone</label>
          <input
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">Location</label>
          <input
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">About</label>
          <textarea
            name="about"
            value={data.about}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">
            Skills (comma separated)
          </label>
          <textarea
            name="skills"
            value={data.skills}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-3"
          />

          <label className="block mb-2 text-sm font-semibold">
            Experience (line per job)
          </label>
          <textarea
            name="experience"
            value={data.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mb-4"
          />

          {/* Upload & Photo Buttons */}
          <label className="block mb-2 text-sm font-semibold">Upload Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mb-2"
          />

          <button
            onClick={handleTogglePhoto}
            className={`w-full mb-4 py-2 rounded font-semibold transition ${
              data.showPhoto
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {data.showPhoto ? "Remove Photo" : "Add Photo"}
          </button>

          <button
            onClick={handleSave}
            className="bg-[#043442] text-white py-2 px-4 rounded w-full hover:bg-[#032c36] mb-3"
          >
            Save Changes
          </button>

          {/* ✅ Multiple Download Options */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-700 text-white py-2 px-4 rounded w-full hover:bg-green-800"
            >
              Download PDF
            </button>
            <button
              onClick={handleDownloadImage}
              className="bg-blue-700 text-white py-2 px-4 rounded w-full hover:bg-blue-800"
            >
              Download Image
            </button>
            <button
              onClick={handleDownloadDOCX}
              className="bg-indigo-700 text-white py-2 px-4 rounded w-full hover:bg-indigo-800"
            >
              Download DOCX
            </button>
          </div>
        </div>

        {/* 🖥️ Live Template Preview */}
        <div
          ref={resumeRef}
          className="scale-90 origin-top bg-white shadow-lg p-6 rounded-lg"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
