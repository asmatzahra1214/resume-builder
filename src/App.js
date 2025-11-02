import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobSearch from "./pages/JobSearch";

import Faqs from "./pages/Faqs";
import About from "./pages/About";
import UploadResume from "./pages/UploadResume";
import ResumeLanding from "./pages/ResumeLanding";
import CreateResume from "./pages/CreateResume";
// admin routes
import Dashboard from "./Admin/Dashboard";
import AdminLayout from "./Admin/AdminLayout";
import Users from "./Admin/Users";

// Separate component for admin routes
function AdminRoutes() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        {/* Fixed Navbar on top */}
        <Navbar />

        {/* Padding top to prevent content overlap with navbar */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/create" element={<CreateResume />} />
            <Route path="/ResumeLanding" element={<ResumeLanding />} />
                {/*<Route path="/profile" element={<Profile />} /> */}
            <Route path="/logout" element={<Home />} /> {/* Redirect to home after logout */}
            <Route path="/jobs" element={<JobSearch />} />

          </Routes>
       </main>
      </div>
    </Router>
=======
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/*Add more admin routes here */}
        <Route path="/users" element={<Users />} />
        {/* <Route path="/settings" element={<AdminSettings />} /> */}
      </Routes>
    </AdminLayout>
>>>>>>> 8bb9b97cc4531c85863658a3246b48399d7ed991
  );
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Hide navbar for admin routes */}
      {!isAdminRoute && <Navbar />}

      {/* Padding top only when navbar is visible */}
      <main className={!isAdminRoute ? "pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/create" element={<CreateResume />} />
          <Route path="/ResumeLanding" element={<ResumeLanding />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          <Route path="/logout" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrap App with Router and BrowserRouter
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}