// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dummy login (you can replace this with backend API later)
//     if (email && password) {
//       const userData = { email };
//       localStorage.setItem("user", JSON.stringify(userData));
//       alert("✅ Login successful!");
//       navigate("/templates"); // redirect to templates
//     } else {
//       alert("⚠️ Please enter both email and password!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-[#e5e7e7]">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center text-[#043442] mb-6">Login</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
//           />
//           <button
//             type="submit"
//             className="bg-[#043442] text-white font-semibold py-2 rounded-lg hover:bg-[#032c36] transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-[#043442] font-semibold hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("⚠️ Please enter both email and password!");
      setLoading(false);
      return;
    }

    // Prepare login data
    const loginData = { 
      email, 
      password
    };

    // Log to console before sending
    console.log("📤 Sending login data to Laravel API:", loginData);
    console.log("🌐 API Endpoint: http://localhost:8000/api/login");

    // Send data to Laravel API
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(loginData),
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
        
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userToStore));
        
        // If you have tokens, store them too
        if (data.access_token) {
          localStorage.setItem("auth_token", data.access_token);
          localStorage.setItem("token_type", data.token_type);
        }
        
        console.log("👤 User data stored:", userToStore);
        
        alert("✅ Login successful!");
        navigate("/templates"); // redirect to templates
      } else {
        console.error("❌ API Error:", data);
        
        // Display specific error messages
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join('\n');
          alert(`❌ ${errorMessages}`);
        } else {
          alert(`❌ ${data.message || 'Login failed!'}`);
        }
      }
    })
    .catch(error => {
      console.error("❌ Fetch Error:", error);
      alert("❌ Network error. Please try again.");
    })
    .finally(() => {
      setLoading(false);
    });
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
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#043442]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#043442] text-white font-semibold py-2 rounded-lg transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#032c36]'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#043442] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}