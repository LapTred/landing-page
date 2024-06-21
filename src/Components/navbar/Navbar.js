import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../../assets/Landing/AtisaGroup-bco.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown on navigation
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img src={Logo} alt="AtisaGroup Logo" className="nav__logo-img" />
        </NavLink>
        <NavLink to="/" className="nav__logo">
          CADENA DE SUMINISTROS
        </NavLink>
        <div className={"nav__menu"} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item" onClick={() => handleNavigation("/about")}>
              <span className="nav__link">QUIENES SOMOS</span>
            </li>
            <li className="nav__item" onClick={() => handleNavigation("/especialidades")}>
              <span className="nav__link">ESPECIALIDADES</span>
            </li>
            <li 
              className="nav__item" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav__link">PROVEEDORES</span>
              {isDropdownOpen && (
                <ul className="dropdown">
                  <li className="dropdown__item" onClick={() => handleNavigation("/construccion")} style={{ backgroundColor: "#AA2B27" }}>
                    CONSTRUCCIÓN
                  </li>
                  <li className="dropdown__item" onClick={() => handleNavigation("/materiales-construccion")} style={{ backgroundColor: "#881F1A" }}>
                    MATERIALES P/CONSTRUCCIÓN
                  </li>
                  <li className="dropdown__item" onClick={() => handleNavigation("/refacciones-maquinaria")} style={{ backgroundColor: "#680F06" }}>
                    REFACCIONES MAQ. PESADA
                  </li>
                  <li className="dropdown__item" onClick={() => handleNavigation("/insumos-oficina")} style={{ backgroundColor: "#470000" }}>
                    INSUMOS P/OFICINA
                  </li>
                </ul>
              )}
            </li>
            <li className="nav__item" onClick={() => handleNavigation("/contact")}>
              <span className="nav__link">CONTACTO</span>
            </li>
            <li className="nav__item" onClick={() => handleNavigation("/location")}>
              <span className="nav__link">ESP|ENG</span>
            </li>
          </ul>
          <div className="nav__close" id="nav-close">
            <IoClose />
          </div>
        </div>
        <div className="nav__toggle" id="nav-toggle">
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
