import React from "react";
import "./App.css";
import Navbar from "./Components/navbar/Navbar.js";
import { Routes, Route } from "react-router-dom";
import About from "./Components/about/About.js";
import Specialty from "./Components/specialty/Specialties.js";
import Footer from './Components/footer/Footer.js'; 
import Login from "./Components/login/Login.js";
import Register from "./Components/register/Register.js";
import PreRegister from "./Components/register/SubRegister.js";
import Reverse from "./Components/reverse-auction/Reverse-auction.js";

const App = () => {
  
  return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/about" element={<About />} />         
            <Route exact path="/especialidades" element={<Specialty />} />
            <Route exact path="/postregister" element={<Register />} />
            <Route exact path="/register" element={<PreRegister />} />
            <Route exact path="/login" element={<Login />} />            
            <Route exact path="/reverse-auction" element={<Reverse />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
};

export default App;
