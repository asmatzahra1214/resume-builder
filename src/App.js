import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
function App() {


  return (
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
  );
}

export default App;