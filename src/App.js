import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Navbar from "./Components/Navbar";



import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Navbar/>
      <Login />
    </Router>
    

  );
}

export default App;
