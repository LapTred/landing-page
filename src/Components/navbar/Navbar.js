import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../../assets/Landing/AtisaGroup-bco.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Estado para controlar el dropdown activo
  const [showSubmenu, setShowSubmenu] = useState(false); // Estado para controlar el submenu principal

  // Función para manejar la navegación y cerrar los menús desplegables
  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Cerrar dropdown principal en la navegación
    setShowSubmenu(false); // Cerrar submenu principal en la navegación
    setActiveDropdown(null); // Limpiar el dropdown activo en la navegación
  };

  // Manejar entrada y salida del dropdown principal
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
    setActiveDropdown(null); // Limpiar el dropdown activo al salir
  };

  // Mostrar y ocultar el submenu principal
  const handleSubmenuEnter = () => {
    setShowSubmenu(true);
  };

  const handleSubmenuLeave = () => {
    setShowSubmenu(false);
  };

  // Manejar entrada y salida de cada dropdown individualmente
  const handleDropdownEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
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
              onMouseOver={() => handleSubmenuEnter()}
              onMouseOut={() => handleSubmenuLeave()}
            >
              <span className="nav__link">PROVEEDORES</span>
              {isDropdownOpen && (
                <ul className="dropdown" onMouseEnter={() => handleDropdownEnter("proveedores")}>
                  <li
                    className="dropdown__item"
                    onClick={() => handleNavigation("/construccion")}
                    style={{ backgroundColor: "#AA2B27" }}
                    onMouseOver={() => handleSubmenuEnter()}
                    onMouseOut={() => handleSubmenuLeave()}
                  >
                    CONSTRUCCIÓN
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/construccion/registro")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/construccion/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => handleNavigation("/materiales-construccion")}
                    style={{ backgroundColor: "#881F1A" }}
                    onMouseOver={() => handleSubmenuEnter()}
                    onMouseOut={() => handleSubmenuLeave()}
                  >
                    MATERIALES P/CONSTRUCCIÓN
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/materiales-construccion/registro")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/materiales-construccion/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => handleNavigation("/refacciones-maquinaria")}
                    style={{ backgroundColor: "#680F06" }}
                    onMouseOver={() => handleSubmenuEnter()}
                    onMouseOut={() => handleSubmenuLeave()}
                  >
                    REFACCIONES MAQ. PESADA
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/refacciones-maquinaria/registro")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/refacciones-maquinaria/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
                  </li>
                  <li
                    className="dropdown__item"
                    onClick={() => handleNavigation("/insumos-oficina")}
                    style={{ backgroundColor: "#470000" }}
                    onMouseOver={() => handleSubmenuEnter()}
                    onMouseOut={() => handleSubmenuLeave()}
                  >
                    INSUMOS P/OFICINA
                    {activeDropdown === "proveedores" && showSubmenu && (
                      <ul className="submenu" style={{ top: "0", left: "100%" }}>
                        <li className="submenu__item" onClick={() => handleNavigation("/insumos-oficina/registro")}>
                          Registro
                        </li>
                        <li className="submenu__item" onClick={() => handleNavigation("/insumos-oficina/reverse-auction")}>
                          Reverse auction
                        </li>
                      </ul>
                    )}
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
