import React, {  useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { saveAs } from "file-saver";


export default function DarkTemplate({ data }) {
  const resumeRef = useRef(null);

  // ✅ Wait for image to load before screenshot
  const waitForImages = () =>
    new Promise((resolve) => {
      const images = resumeRef.current?.querySelectorAll("img") || [];
      let loaded = 0;
      if (images.length === 0) return resolve();
      images.forEach((img) => {
        if (img.complete) loaded++;
        else
          img.onload = img.onerror = () => {
            loaded++;
            if (loaded === images.length) resolve();
          };
      });
      if (loaded === images.length) resolve();
    });

  // ✅ Download PDF
  const downloadAsPDF = async () => {
    await waitForImages();
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("dark_resume.pdf");
  };

  // ✅ Download Image
  const downloadAsImage = async () => {
    await waitForImages();
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "dark_resume.png";
    link.click();
  };

  // ✅ Download DOCX (Word file)
  const downloadAsDocx = async () => {
    let imageData = null;

    if (data.photo) {
      try {
        const response = await fetch(data.photo);
        const blob = await response.blob();
        imageData = await blob.arrayBuffer();
      } catch (e) {
        console.warn("Image fetch failed:", e);
      }
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: data.name || "Your Name",
                  bold: true,
                  size: 32,
                  color: "1E293B",
                }),
                new TextRun({
                  text: `\n${data.title || "Your Title"}`,
                  italics: true,
                  size: 24,
                  color: "334155",
                }),
              ],
            }),
            new Paragraph({
              text: `\n📧 ${data.email || ""}   📞 ${data.phone || ""}   📍 ${
                data.location || ""
              }`,
              spacing: { after: 200 },
            }),
            imageData
              ? new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageData,
                      transformation: { width: 100, height: 100 },
                    }),
                  ],
                })
              : null,
            new Paragraph({
              text: "\nAbout Me",
              heading: "Heading1",
            }),
            new Paragraph({
              text: data.about || "Write a short bio about yourself here.",
            }),
            new Paragraph({
              text: "\nSkills",
              heading: "Heading1",
            }),
            ...(Array.isArray(data.skills)
              ? data.skills
              : data.skills?.split(",") || []
            ).map(
              (skill) =>
                new Paragraph({
                  text: `• ${skill.trim()}`,
                })
            ),
            new Paragraph({
              text: "\nExperience",
              heading: "Heading1",
            }),
            ...(Array.isArray(data.experience)
              ? data.experience.map(
                  (exp) =>
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${exp.role || "Role"} – ${
                            exp.company || "Company"
                          }`,
                          bold: true,
                        }),
                        new TextRun({
                          text: `\n${exp.duration || ""}\n${
                            exp.details || ""
                          }\n`,
                        }),
                      ],
                    })
                )
              : [new Paragraph({ text: data.experience || "" })]),
          ].filter(Boolean),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "dark_resume.docx");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ✅ Resume Preview */}
      <div
        ref={resumeRef}
        id="dark-resume-preview"
        className="w-[600px] bg-[#0f172a] text-[#e2e8f0] shadow-2xl rounded-xl p-8 font-sans border border-[#1e293b]"
      >
        {/* Header with Photo */}
        <div className="flex items-center gap-4 mb-6">
          {data?.showPhoto && data?.photo && (
            <img
              src={data.photo}
              alt="Profile"
              crossOrigin="anonymous"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#38bdf8]"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-[#38bdf8]">
              {data?.name || "Your Name"}
            </h1>
            <p className="text-lg text-[#94a3b8]">
              {data?.title || "Your Title"}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          📧 {data?.email || "example@email.com"} | 📞{" "}
          {data?.phone || "000-0000000"} | 📍 {data?.location || "Your City"}
        </p>

        {/* About */}
        <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
          About Me
        </h2>
        <p className="text-gray-300 mb-4">
          {data?.about || "Write a short bio about yourself here."}
        </p>

        {/* Skills */}
        <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2 mb-4">
          {(Array.isArray(data?.skills)
            ? data.skills
            : data?.skills?.split(",") || []
          ).map((skill, i) => (
            <li
              key={i}
              className="bg-[#1e293b] text-[#e2e8f0] px-3 py-1 rounded-md text-sm border border-[#38bdf8]/30 hover:bg-[#1e293b]/80 transition"
            >
              {skill.trim()}
            </li>
          ))}
        </ul>

        {/* Experience */}
        <h2 className="text-xl font-semibold text-[#38bdf8] border-b border-[#38bdf8]/30 mb-2">
          Experience
        </h2>
        {Array.isArray(data?.experience)
          ? data.experience.map((exp, i) => (
              <div key={i} className="mb-3 border-l-4 border-[#38bdf8]/40 pl-3">
                <p className="font-semibold text-[#e2e8f0]">
                  {exp.role || "Job Role"} – {exp.company || "Company Name"}
                </p>
                <p className="text-sm text-gray-400">{exp.duration}</p>
                <p className="text-gray-300">{exp.details}</p>
              </div>
            ))
          : data?.experience && (
              <p className="text-gray-300">{data.experience}</p>
            )}
      </div>

      {/* ✅ Download Buttons */}
      <div className="flex gap-3">
        <button
          onClick={downloadAsPDF}
          className="bg-[#38bdf8] text-[#0f172a] px-4 py-2 rounded-lg font-semibold hover:bg-[#0ea5e9] transition"
        >
          Download PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="bg-[#1e293b] border border-[#38bdf8] text-[#38bdf8] px-4 py-2 rounded-lg font-semibold hover:bg-[#1e293b]/80 transition"
        >
          Download Image
        </button>
        <button
          onClick={downloadAsDocx}
          className="bg-[#0ea5e9] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0284c7] transition"
        >
          Download DOCX
        </button>
      </div>
    </div>
  );
}
