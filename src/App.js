import React from "react";
import "./App.css";
import Navbar from "./Components/navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.js";
import About from "./pages/about/About.js";
import Specialty from "./pages/specialty/Specialties.js";
import Footer from './Components/footer/Footer.js'; 
import Login from "./Components/login/Login.js"

const App = () => {
 return (
   <Router>
     <Navbar />
     <main className="main-content">
       <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/about" element={<About />} />         
         <Route exact path="/especialidades" element={<Specialty />} />
         <Route exact path="/register" element={<Login />} />
       </Routes>
     </main>
     <Footer />
   </Router>
 );
};

export default App;