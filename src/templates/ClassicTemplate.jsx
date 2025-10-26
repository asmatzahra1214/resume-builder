import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";

export default function ClassicTemplate({ data }) {
  // ✅ PDF Download
  const downloadAsPDF = async () => {
    const element = document.getElementById("classic-resume-preview");
    const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("classic_resume.pdf");
  };

  // ✅ Image Download
  const downloadAsImage = async () => {
    const element = document.getElementById("classic-resume-preview");
    const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
    canvas.toBlob((blob) => {
      saveAs(blob, "classic_resume.png");
    });
  };

  // ✅ DOCX Download (with image support)
  const downloadAsDocx = async () => {
    let imageData = null;

    if (data.photo) {
      const response = await fetch(data.photo);
      const blob = await response.blob();
      imageData = await blob.arrayBuffer();
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
                }),
                new TextRun({
                  text: `\n${data.title || "Your Title"}`,
                  italics: true,
                  size: 24,
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
              text: "\nProfile Summary",
              heading: "Heading1",
            }),
            new Paragraph({
              text: data.about || "Write about yourself here...",
            }),
            new Paragraph({
              text: "\nKey Skills",
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
    saveAs(blob, "classic_resume.docx");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ✅ Resume Preview */}
      <div
        id="classic-resume-preview"
        className="w-[650px] bg-white text-[#043442] border border-gray-200 rounded-2xl shadow-2xl overflow-hidden font-sans"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#043442] to-[#065a6e] text-white p-8 flex items-center gap-6">
          {data.showPhoto && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              {data.photo ? (
                <img
                  crossOrigin="anonymous"
                  src={data.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-white/20">
                  {data.name?.charAt(0) || "N"}
                </div>
              )}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
            <p className="text-lg opacity-90">{data.title || "Your Title"}</p>
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
            <p className="text-gray-700 leading-relaxed">
              {data.about || "Write about yourself here..."}
            </p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold border-b-2 border-[#043442] pb-1 mb-3">
              Key Skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              {(Array.isArray(data.skills)
                ? data.skills
                : data.skills?.split(","))?.map((skill, i) => (
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
                    {exp.role || "Job Role"} – {exp.company || "Company Name"}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    {exp.duration || "Duration"}
                  </p>
                  <p className="text-gray-700 text-sm">{exp.details}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">{data.experience}</p>
            )}
          </section>
        </div>
      </div>

      {/* ✅ Download Buttons */}
      <div className="flex gap-3">
        <button
          onClick={downloadAsPDF}
          className="bg-[#043442] text-white px-4 py-2 rounded-lg hover:bg-[#032c36] transition"
        >
          Download PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="bg-white border border-[#043442] text-[#043442] px-4 py-2 rounded-lg hover:bg-[#043442]/10 transition"
        >
          Download Image
        </button>
        <button
          onClick={downloadAsDocx}
          className="bg-[#065a6e] text-white px-4 py-2 rounded-lg hover:bg-[#044958] transition"
        >
          Download DOCX
        </button>
      </div>
    </div>
  );
}
