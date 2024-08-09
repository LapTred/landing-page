import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../../assets/Landing/AtisaGroup-bco.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const menuToggleRef = useRef(null); 

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); 
    setShowSubmenu(false); 
    setActiveDropdown(null); 
    setMobileMenuOpen(false); 
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setActiveDropdown(null); 
  };

  const handleSubmenuEnter = () => {
    setShowSubmenu(true);
  };

  const handleSubmenuLeave = () => {
    setShowSubmenu(false);
  };

  const handleDropdownEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const isActive = (path) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav">
          <NavLink to="/about" className="nav__logo">
            <img src={Logo} alt="AtisaGroup Logo" className="nav__logo-img" />
          </NavLink>
          <NavLink to="/about" className="nav__logo-text">
            CADENA DE SUMINISTROS
          </NavLink>
        </div>
        
        <div
          className={`nav__menu ${isMobileMenuOpen ? "show-menu" : ""}`}
          id="nav-menu"
          ref={menuRef}
        >
          <ul className="nav__list">
            <li className={`nav__item ${isActive("/about") ? "active" : ""}`} onClick={() => handleNavigation("/about")}>
              <span className="nav__link">QUIENES SOMOS</span>
            </li>
            <li className={`nav__item ${isActive("/especialidades") ? "active" : ""}`} onClick={() => handleNavigation("/especialidades")}>
              <span className="nav__link">ESPECIALIDADES</span>
            </li>
            <li
              className="nav__item"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseOver={handleSubmenuEnter}
              onMouseOut={handleSubmenuLeave}
            >
              <span className="nav__link">PROVEEDORES</span>
              {isDropdownOpen && (
                <ul className="dropdown" onMouseEnter={() => handleDropdownEnter("proveedores")}>
                  <li
                    className="dropdown__item"
                    style={{ backgroundColor: "#AA2B27" }}
                    onMouseOver={handleSubmenuEnter}
                    onMouseOut={handleSubmenuLeave}
                  >
                    CONSTRUCCIÓN
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/register")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    style={{ backgroundColor: "#881F1A" }}
                    onMouseOver={handleSubmenuEnter}
                    onMouseOut={handleSubmenuLeave}
                  >
                    MATERIALES P/CONSTRUCCIÓN
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/register")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    style={{ backgroundColor: "#680F06" }}
                    onMouseOver={handleSubmenuEnter}
                    onMouseOut={handleSubmenuLeave}
                  >
                    REFACCIONES MAQ. PESADA
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/register")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    style={{ backgroundColor: "#470000" }}
                    onMouseOver={handleSubmenuEnter}
                    onMouseOut={handleSubmenuLeave}
                  >
                    INSUMOS P/OFICINA
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/register")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className={`nav__item ${isActive("/contact") ? "active" : ""}`} onClick={() => handleNavigation("/contact")}>
              <span className="nav__link">CONTACTO</span>
            </li>
            <li className={"nav__item"}>
              <span className="nav__link">ESP|ENG</span>
            </li>
            <li className={`nav__item ${isActive("/login") ? "active" : ""}`} onClick={() => handleNavigation("/login")}>
              <span className="nav__link">INICIAR SESIÓN</span>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={handleMobileMenuToggle}>
            <IoClose />
          </div>
        </div>
        <div className="nav__toggle" id="nav-toggle" onClick={handleMobileMenuToggle} ref={menuToggleRef}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
