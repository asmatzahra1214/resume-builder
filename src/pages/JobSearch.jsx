import React, { useState } from "react";

export default function JobSearchPage() {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload your resume!");

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("location", location); // optional filter

    try {
      const res = await fetch("http://127.0.0.1:8000/api/jobs/search", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while searching jobs!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Job Search Based on Your Resume
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-2">
            Upload Your Resume (PDF or DOC)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Preferred Location</label>
          <input
            type="text"
            placeholder="e.g. Lahore, Karachi, Islamabad"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Searching..." : "Find Jobs"}
        </button>
      </form>

      <div className="mt-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Matching Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs found yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job, i) => (
              <li
                key={i}
                className="border p-4 rounded-lg bg-white shadow hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p>{job.description}</p>
                <p className="text-sm text-gray-500">
                  {job.company} — {job.location}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
