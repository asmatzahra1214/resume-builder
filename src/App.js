import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor"; // 👈 Added Editor page import
import Templates from "./pages/Templates";
import Faqs from "./pages/Faqs";
import About from "./pages/About";
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
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<About />} />
               {/* 👇 New route for template editor */}
            <Route path="/editor/:id" element={<Editor />} />
              <Route path="/faqs" element={<Faqs />} />
                {/*<Route path="/profile" element={<Profile />} /> */}
            <Route path="/logout" element={<Home />} /> {/* Redirect to home after logout */}

          </Routes>
       </main>
      </div>
    </Router>
  );
}

export default App;