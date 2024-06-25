import React from "react";
import "./App.css";
import Navbar from "./Components/navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.js";
import About from "./pages/about/About.js";
import Specialty from "./pages/specialty/Specialty.js";

const App = () => {
 return (
   <Router>
     <Navbar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />         
         <Route path="/especialidades" element={<About />} />
         {/* Define other routes that you need*/}
       </Routes>
     </main>
   </Router>
 );
};

export default App;