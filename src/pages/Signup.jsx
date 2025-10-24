import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e5e7e7]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#043442] mb-6">Sign Up</h2>
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
          />
          <button
            type="submit"
            className="bg-[#043442] text-white font-semibold py-2 rounded-lg hover:bg-[#032c36] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#043442] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
