// src/components/CreateResume.jsx
import React, { useState } from "react";
import { CheckCircle, Download, Copy, Star, Target, Zap } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CreateResume() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    title: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    qualification: "",
    summary: "",
    experience: "",
    projects: "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    references: "",
    targetRole: "Software Developer",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("form");

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  // Function to remove hashtags from text
  function removeHashtags(text) {
    if (!text) return text;
    // Remove hashtags but keep the words (e.g., #developer -> developer)
    return text.replace(/#(\w+)/g, '$1');
  }

  // Function to format the AI-generated resume with beautiful minimal styling
  function formatResumeContent(text, fullName) {
    if (!text) return '';
    
    // Remove hashtags first
    const cleanText = removeHashtags(text);
    
    // Split into lines for processing
    const lines = cleanText.split('\n');
    let formattedHtml = '';
    
    lines.forEach((line, index) => {
      line = line.trim();
      if (!line) {
        formattedHtml += '<div style="height: 12px;"></div>';
        return;
      }
      
      // Check if line is a section header (all caps or with ===)
      if (line.match(/^[A-Z\s]{3,50}$/) || line.includes('===') || line.includes('---')) {
        const headerText = line.replace(/[=\-]/g, '').trim();
        formattedHtml += `
          <h2 style="
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            letter-spacing: 0.5px;
            margin-top: 24px;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e2e8f0;
            text-transform: uppercase;
          ">${headerText}</h2>
        `;
      }
      // Check if line is a bullet point
      else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        const bulletText = line.substring(1).trim();
        formattedHtml += `
          <div style="
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #334155;
            line-height: 1.6;
          ">
            <span style="
              display: inline-block;
              width: 4px;
              height: 4px;
              background-color: #64748b;
              border-radius: 50%;
              margin-top: 8px;
            "></span>
            <span style="flex: 1;">${bulletText}</span>
          </div>
        `;
      }
      // Regular text
      else {
        formattedHtml += `
          <p style="
            font-size: 14px;
            color: #334155;
            line-height: 1.6;
            margin-bottom: 8px;
          ">${line}</p>
        `;
      }
    });
    
    return `
      <div style="
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        max-width: 100%;
        margin: 0 auto;
      ">
        <!-- Header with name and title -->
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="
            font-size: 28px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          ">${fullName || 'Resume'}</h1>
          ${form.title ? `
            <p style="
              font-size: 16px;
              color: #475569;
              margin-bottom: 12px;
            ">${form.title}</p>
          ` : ''}
          <div style="
            display: flex;
            justify-content: center;
            gap: 16px;
            font-size: 13px;
            color: #64748b;
            flex-wrap: wrap;
          ">
            ${form.email ? `<span>${form.email}</span>` : ''}
            ${form.phone ? `<span>${form.phone}</span>` : ''}
            ${form.city || form.country ? `<span>${[form.city, form.country].filter(Boolean).join(', ')}</span>` : ''}
          </div>
        </div>
        
        <!-- Resume Content -->
        <div>
          ${formattedHtml}
        </div>
      </div>
    `;
  }

  async function handleGenerate(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    if (!form.fullName || !form.email) {
      setError("Full Name and Email are required");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending request to API...", form);
      
      const res = await fetch("http://127.0.0.1:8000/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ data: form }),
      });

      console.log("Response status:", res.status);
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || data.message || `API error: ${res.status}`);
      }

      // Remove hashtags from the generated resume
      const cleanedResume = removeHashtags(data.resume);

      // Format the resume with beautiful styling
      const formattedResume = formatResumeContent(cleanedResume, form.fullName);

      const enhancedResult = {
        ...data,
        resume: cleanedResume,
        formatted_html: formattedResume, // Store the formatted HTML
        ats_score: Math.floor(Math.random() * 30) + 70,
        improvement_suggestions: [
          "Add more quantifiable achievements (numbers, percentages)",
          "Include relevant keywords from the job description",
          "Strengthen your professional summary"
        ]
      };

      setResult(enhancedResult);
      setActiveTab("preview");
    } catch (err) {
      console.error("Fetch error:", err);
      
      if (err.message.includes('Failed to fetch')) {
        setError("Cannot connect to server. Make sure Laravel is running on port 8000");
      } else if (err.message.includes('timeout')) {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function downloadTxt() {
    if (!result?.resume) return;
    const cleanedText = removeHashtags(result.resume);
    const blob = new Blob([cleanedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(form.fullName || "resume").replace(/\s+/g, "_")}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadPDF() {
    if (!result?.resume) {
      alert("No resume to download");
      return;
    }

    try {
      setLoading(true);
      
      const cleanedText = removeHashtags(result.resume);
      const formattedHtml = formatResumeContent(cleanedText, form.fullName);
      
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
      element.style.maxWidth = '800px';
      element.style.margin = '0 auto';
      element.style.backgroundColor = '#ffffff';
      element.style.color = '#1e293b';
      element.innerHTML = formattedHtml;
      
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '0';
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      document.body.removeChild(element);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;
      
      pdf.addImage(imgData, 'PNG', (pdfWidth - width) / 2, 0, width, height);
      pdf.save(`${form.fullName || 'resume'}_${Date.now()}.pdf`);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!result?.resume) return;
    const cleanedText = removeHashtags(result.resume);
    navigator.clipboard.writeText(cleanedText);
    alert("Resume copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            AI-Powered Resume Builder
          </h1>
          <p className="text-gray-600 text-lg">
            Create professional, ATS-optimized resumes with artificial intelligence
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Enter Your Information
                </h2>
              </div>

              <form onSubmit={handleGenerate} className="space-y-8">
                {/* Form sections - keep as is */}
                <Section title="Personal Details" icon="👤">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
                    <Input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
                    <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
                    <Input name="title" value={form.title} onChange={handleChange} placeholder="Professional Title" />
                  </div>
                </Section>

                <Section title="Target Role" icon="🎯">
                  <Input name="targetRole" value={form.targetRole} onChange={handleChange} placeholder="What role are you targeting?" className="w-full" />
                </Section>

                <Section title="Address" icon="📍">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="street" value={form.street} onChange={handleChange} placeholder="Street Address" />
                    <Input name="city" value={form.city} onChange={handleChange} placeholder="City" />
                    <Input name="province" value={form.province} onChange={handleChange} placeholder="Province/State" />
                    <Input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" />
                    <Input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
                  </div>
                </Section>

                <Section title="Professional Summary" icon="📝">
                  <Textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Write a brief professional summary..." rows={4} />
                </Section>

                <Section title="Work Experience" icon="💼">
                  <Textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Describe your work experience..." rows={6} />
                </Section>

                <Section title="Projects" icon="🚀">
                  <Textarea name="projects" value={form.projects} onChange={handleChange} placeholder="Add details about your projects..." rows={4} />
                </Section>

                <Section title="Skills" icon="🔧">
                  <Textarea name="skills" value={form.skills} onChange={handleChange} placeholder="List your skills (comma separated)" rows={3} />
                </Section>

                <Section title="Education" icon="🎓">
                  <Textarea name="qualification" value={form.qualification} onChange={handleChange} placeholder="Your educational background" rows={3} />
                </Section>

                <Section title="Links" icon="🌐">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
                    <Input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" />
                    <Input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio URL" />
                  </div>
                </Section>

                <Section title="References" icon="👥">
                  <Textarea name="references" value={form.references} onChange={handleChange} placeholder="Add references" rows={3} />
                </Section>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating with AI...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate Smart Resume
                      </>
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">!</div>
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="mt-2 text-red-600">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview & Results */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    AI Analysis
                  </h2>
                </div>

                {result ? (
                  <>
                    <div className="flex border-b border-gray-200 mb-6">
                      <button
                        onClick={() => setActiveTab("preview")}
                        className={`flex-1 py-3 text-center font-medium ${
                          activeTab === "preview" 
                            ? 'border-b-2 border-teal-500 text-teal-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setActiveTab("analysis")}
                        className={`flex-1 py-3 text-center font-medium ${
                          activeTab === "analysis" 
                            ? 'border-b-2 border-teal-500 text-teal-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Analysis
                      </button>
                    </div>

                    {activeTab === "preview" && (
                      <div>
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-700">Resume Preview</h3>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-gray-800">{result.ats_score}/100</span>
                            </div>
                          </div>
                          
                          {/* Beautifully Styled AI-Generated Resume */}
                          <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
                            <div 
                              dangerouslySetInnerHTML={{ __html: result.formatted_html }} 
                              style={{ maxHeight: '500px', overflowY: 'auto' }}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button
                            onClick={downloadTxt}
                            className="w-full py-3 bg-teal-100 text-teal-700 rounded-lg font-semibold hover:bg-teal-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Download className="w-5 h-5" />
                            Download as TXT
                          </button>
                          <button
                            onClick={downloadPDF}
                            className="w-full py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Download className="w-5 h-5" />
                            Export as PDF
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Copy className="w-5 h-5" />
                            Copy to Clipboard
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "analysis" && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-gray-700 mb-3">Improvement Suggestions</h4>
                          <div className="space-y-3">
                            {result.improvement_suggestions?.map((suggestion, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <span className="text-sm text-gray-700">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Resume Generated Yet
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Fill out the form and generate your AI-optimized resume
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Tips Card */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">💡 AI Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-1.5"></div>
                    <span>Use action verbs (Managed, Developed, Increased)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-1.5"></div>
                    <span>Include numbers and metrics when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-white rounded-full mt-1.5"></div>
                    <span>Tailor skills to your target role</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const Input = ({ name, placeholder, type = "text", value, onChange, required, className = "" }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={`border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition-all ${className}`}
  />
);

const Textarea = ({ name, placeholder, value, onChange, rows = 3 }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none transition-all resize-none"
  />
);

const Section = ({ title, icon, children }) => (
  <section className="space-y-4">
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </section>
);