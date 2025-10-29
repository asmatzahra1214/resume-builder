import React from "react";

export default function CreateResume() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
     
    >
      <div className="bg-white/95 backdrop-blur-lg mt-[50px] shadow-4xl rounded-2xl p-10 w-full max-w-5xl overflow-y-auto border border-teal-100"
       style={{
        background: "linear-gradient(135deg, #5facacff 0%, #1affffff 100%)", // 🌊 Teal gradient
      }}>
        <h2 className="text-3xl font-bold text-[#043442] mb-6 text-center drop-shadow-sm">
          Build a New Resume
        </h2>

        <form className="space-y-10">
          <Section title="Profile Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Full Name" />
              <Input type="email" placeholder="Email" />
              <Input placeholder="Phone (with country code)" />
              <Input placeholder="Professional Title" />
            </div>
          </Section>

          <Section title="Address">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Street Address" />
              <Input placeholder="City" />
              <Input placeholder="Province" />
              <Input placeholder="Postal Code" />
              <Input placeholder="Country" />
            </div>
          </Section>

          <Section title="Qualification">
            <Textarea placeholder="Your academic qualifications (e.g. BSCS, MBA, etc.)" />
          </Section>

          <Section title="Professional Summary">
            <Textarea placeholder="Write a short professional summary..." />
          </Section>

          <Section title="Experience">
            <Textarea placeholder="Describe your work experience..." />
          </Section>

          <Section title="Projects (Optional)">
            <Textarea placeholder="Add details about your projects..." />
          </Section>

          <Section title="Skills">
            <Textarea placeholder="List your skills separated by commas" />
          </Section>

          <Section title="Social Media Links (Optional)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="LinkedIn Profile" />
              <Input placeholder="GitHub Profile" />
              <Input placeholder="Portfolio Website" />
            </div>
          </Section>

          <Section title="References (Optional)">
            <Textarea placeholder="Add references with name and contact info" />
          </Section>

          <button
            type="button"
            className="w-full py-3 bg-[#00695c] text-white rounded-lg font-semibold hover:bg-[#004d40] transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Build Resume with AI
          </button>
        </form>
      </div>
    </div>
  );
}

// 🧩 Reusable Input
const Input = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none"
  />
);

// 🧩 Reusable Textarea
const Textarea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-teal-500 focus:outline-none h-28"
  />
);

// 🧩 Reusable Section
const Section = ({ title, children }) => (
  <section>
    <h3 className="text-xl font-semibold mb-4 text-[#043442]">{title}</h3>
    {children}
  </section>
);
