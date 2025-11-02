import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!name || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords don't match!");
      return;
    }

    // Prepare user data
    const userData = { 
      name, 
      email, 
      password,
      password_confirmation: confirmPassword
    };

    console.log("📤 Sending user data to Laravel API:", userData);

    // Send data to Laravel API
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("✅ API Response:", data);
      
      if (data.success) {
        // Store user data in localStorage
        const userToStore = { 
          id: data.user.id,
          name: data.user.name, 
          email: data.user.email 
        };
        
        // Store auth token in localStorage
        localStorage.setItem("user", JSON.stringify(userToStore));
        localStorage.setItem("auth_token", data.access_token);
        localStorage.setItem("token_type", data.token_type);
        
        console.log("🔐 Auth Token stored in localStorage:", data.access_token);
        console.log("👤 User data stored:", userToStore);
        
        alert("✅ Account created successfully!");
        navigate("/templates");
      } else {
        console.error("❌ API Error:", data);
        
        // Display validation errors
        if (data.errors) {
          setErrors(data.errors);
          // Show first error as alert
          const firstError = Object.values(data.errors)[0][0];
          alert(`❌ ${firstError}`);
        } else {
          alert(`❌ ${data.message || 'Registration failed!'}`);
        }
      }
    })
    .catch(error => {
      console.error("❌ Fetch Error:", error);
      alert("❌ Network error. Please try again.");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e5e7e7]">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#043442] mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#043442] ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#043442] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#043442] ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#043442]"
            />
          </div>

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