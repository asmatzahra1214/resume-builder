import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Templates from './pages/Templates';
import About from './pages/About';
// import Contact from './pages/Contact';
// import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="pt-16"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} /> */}
            <Route path="/logout" element={<Home />} /> {/* Redirect to home after logout */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;