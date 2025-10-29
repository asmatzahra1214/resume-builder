// 📁 src/pages/UploadResume.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const navigate=useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleEnhance = () => {
    if (!file) return alert("Please upload a resume first!");
    alert("AI enhancement started... (integrate Laravel API here)");
  };

  const handleCancle =()=>{
    navigate('/ResumeLanding');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafa] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#043442] mb-6 text-center">
          Upload Your Resume
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Resume (PDF/DOC/Image)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#043442]"
            />
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleEnhance}
            className="w-full py-3 bg-[#043442] text-white rounded-lg font-semibold hover:bg-[#064e63] transition"
          >
            Enhance Resume with AI
          </button>
          <button
            type="button"
            onClick={handleCancle}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-400 transition"
          >
            Cancle
          </button>
        </form>
      </div>
    </div>
  );
}
