import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login (you can replace this with backend API later)
    if (email && password) {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
      alert("✅ Login successful!");
      navigate("/templates"); // redirect to templates
    } else {
      alert("⚠️ Please enter both email and password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e5e7e7]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#043442] mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
          />
          <button
            type="submit"
            className="bg-[#043442] text-white font-semibold py-2 rounded-lg hover:bg-[#032c36] transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#043442] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
