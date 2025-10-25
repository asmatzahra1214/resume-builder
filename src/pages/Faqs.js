import React, { useState } from "react";

const Faqs = () => {
  const faqs = [
    {
      question: "What is an AI Resume Builder?",
      answer:
        "An AI Resume Builder helps you create professional, ATS-friendly resumes using smart suggestions for skills, grammar, keywords, and formatting.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Yes! You can build and download resumes for free. Premium templates may be added in the future.",
    },
    {
      question: "Do I need design skills?",
      answer:
        "No. Our user-friendly editor and templates automatically handle layout and styling.",
    },
    {
      question: "What is ATS compatibility?",
      answer:
        "ATS stands for Applicant Tracking System. Our templates are designed to pass ATS scans and increase job selection chances.",
    },
    {
      question: "Can AI write content for me?",
      answer:
        "Yes! Our AI suggests job descriptions, achievements, skill points, and professional summaries based on your industry.",
    },
    {
      question: "Can I edit my resume later?",
      answer:
        "Absolutely. You can update and download your resume anytime.",
    },
    {
      question: "Do you support PDF download?",
      answer:
        "Yes! You can export your resume instantly as a high-quality PDF.",
    },
    {
      question: "Are my details secure?",
      answer:
        "Your data is stored securely and will never be shared with third parties.",
    },
    {
      question: "Can I create multiple resumes?",
      answer:
        "Yes! You can build multiple resumes for different job roles or industries.",
    },
    {
      question: "Does the AI improve grammar?",
      answer:
        "Yes. Our AI enhances tone, clarity, readability, and grammar automatically.",
    },
    {
      question: "What devices are supported?",
      answer:
        "It works perfectly on desktop, laptop, tablet, and mobile browsers.",
    },
    {
      question: "Will more features be added?",
      answer:
        "Yes! Upcoming features include AI cover letters, job suggestions, and interview preparation tools.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12 px-6 lg:px-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#043442] mb-10">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-[#043442]/80 mb-8 max-w-2xl mx-auto">
          Have questions about our AI Resume Builder? We’ve got answers!
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#043442]/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#043442]">
                  {faq.question}
                </h3>
                <span className="text-[#043442] text-2xl font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>

              {/* Answer */}
              {openIndex === index && (
                <p className="mt-3 text-[#043442]/80 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#043442]/80 text-lg">
            Still have questions? Contact our support for help.
          </p>
          <button className="mt-4 bg-[#043442] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#032f36] transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
