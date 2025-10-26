import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function MinimalTemplate({ data }) {
  const resumeRef = useRef(null);

  // 🕒 Wait for all images to load before capture
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

  // 🧾 Download as PDF
  const downloadAsPDF = async () => {
    await waitForImages();
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");
  };

  // 🖼️ Download as Image
  const downloadAsImage = async () => {
    await waitForImages();
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "resume.png";
    link.click();
  };

  // 📘 Download as DOCX
  const downloadAsDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: data?.name || "Your Name",
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: data?.title || "Your Title",
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${data?.email || ""} | ${data?.phone || ""} | ${
                    data?.location || ""
                  }`,
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "About Me", bold: true }),
                new TextRun({ text: "\n" + (data?.about || ""), break: 1 }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Skills", bold: true }),
                new TextRun({
                  text:
                    "\n" +
                    (Array.isArray(data?.skills)
                      ? data.skills.join(", ")
                      : data?.skills || ""),
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              text: "",
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Experience", bold: true }),
                new TextRun({
                  text:
                    "\n" +
                    (Array.isArray(data?.experience)
                      ? data.experience
                          .map(
                            (exp) =>
                              `${exp.role || ""} - ${exp.company || ""}\n${
                                exp.duration || ""
                              }\n${exp.details || ""}`
                          )
                          .join("\n\n")
                      : data?.experience || ""),
                  break: 1,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ===== Resume Preview ===== */}
      <div
        ref={resumeRef}
        id="minimal-resume-preview"
        className="w-[650px] bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-10 text-[#043442] font-inter border border-gray-200"
      >
        {/* ===== Header Section ===== */}
        <header className="flex flex-col items-center text-center mb-10">
          {data?.showPhoto && data?.photo && (
            <div className="relative mb-5">
              <img
                src={data.photo}
                alt="Profile"
                crossOrigin="anonymous"
                className="w-28 h-28 rounded-full object-cover border-4 border-[#043442]/20 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#043442] text-white text-xs px-2 py-[2px] rounded-full shadow-md">
                {data?.title?.split(" ")[0] || "Pro"}
              </div>
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            {data?.name || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600 font-medium mt-1">
            {data?.title || "Your Title"}
          </p>
        </header>

        {/* ===== Contact Info ===== */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-10 border-t border-b border-gray-200 py-3">
          {data?.email && (
            <span className="flex items-center gap-1">
              <span>📧</span> {data.email}
            </span>
          )}
          {data?.phone && (
            <span className="flex items-center gap-1">
              <span>📞</span> {data.phone}
            </span>
          )}
          {data?.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {data.location}
            </span>
          )}
        </div>

        {/* ===== About Section ===== */}
        {data?.about && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 border-b-2 border-[#043442]/20 pb-1">
              <span className="text-[#043442] text-lg">💬</span> Profile Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {data.about}
            </p>
          </section>
        )}

        {/* ===== Skills Section ===== */}
        {data?.skills && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 border-b-2 border-[#043442]/20 pb-1">
              <span className="text-[#043442] text-lg">🧠</span> Key Skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              {(Array.isArray(data.skills)
                ? data.skills
                : data.skills.split(",")
              ).map((skill, i) => (
                <li
                  key={i}
                  className="bg-[#043442]/10 hover:bg-[#043442]/20 transition text-[#043442] font-medium px-4 py-1.5 rounded-full text-sm shadow-sm border border-[#043442]/10"
                >
                  {skill.trim()}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ===== Experience Section ===== */}
        {data?.experience && (
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 border-b-2 border-[#043442]/20 pb-1">
              <span className="text-[#043442] text-lg">💼</span> Experience
            </h2>

            {Array.isArray(data.experience) ? (
              data.experience.map((exp, i) => (
                <div
                  key={i}
                  className="border-l-4 border-[#043442]/60 pl-4 py-3 mb-4 hover:bg-gray-50 rounded transition-all"
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
        )}
      </div>

      {/* ===== Download Buttons ===== */}
      <div className="flex gap-3">
        <button
          onClick={downloadAsPDF}
          className="bg-[#043442] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#065a72] transition"
        >
          Download PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="bg-white border border-[#043442] text-[#043442] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Download Image
        </button>
        <button
          onClick={downloadAsDocx}
          className="bg-[#065a72] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#043442] transition"
        >
          Download DOCX
        </button>
      </div>
    </div>
  );
}
