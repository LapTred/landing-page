import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import background from "../../assets/Landing/Imagen-de-fondo.jpg";
import "./About.css";
import Asset1 from "../../assets/Landing/Asset1.png";
import Asset3 from "../../assets/Landing/Asset3.png";
import Asset4 from "../../assets/Landing/Asset4.png";
import Asset5 from "../../assets/Landing/Asset5.png";
import Asset6 from "../../assets/Landing/Asset6.png";
import Asset7 from "../../assets/Landing/Asset7.png";
import Asset8 from "../../assets/Landing/Asset8.png";
import Asset9 from "../../assets/Landing/Asset9.png";
import Asset10 from "../../assets/Landing/Asset10.png";
import Asset11 from "../../assets/Landing/Asset11.png";
import Asset12 from "../../assets/Landing/Asset12.png";
import Asset13 from "../../assets/Landing/Asset13.png";
import Asset14 from "../../assets/Landing/Asset14.png";

const About = () => {
    const [hovered, setHovered] = useState(null);

    const handleMouseEnter = (id) => {
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className="about">
            <div className="about__background-container">
                <img src={background} alt="Background" className="about__background"/>     
                <div className="about__overlay">
                    <div className="about__text-container">
                        <h1>SÉ NUESTRO ALIADO COMERCIAL</h1>
                        <p className="text-center">EN ATISA BUSCAMOS SUPERAR NUESTRA META DE 1,000,000 DE PIES CUADRADOS CONSTRUIDOS Y ESTAMOS SEGUROS QUE SIENDO NUESTRO ALIADO PODREMOS LOGRARLO.</p>
                    </div>
                    <div className="about__text-containers">
                        <div className="about__text-container">
                            <h1>+1,000,000</h1>
                            <p>SQ FT CONSTRUIDOS</p>                    
                        </div>
                        <div className="about__text-container">
                            <h1>+50</h1>
                            <p>AÑOS DE EXPERIENCIA</p>                   
                        </div>
                        <div className="about__text-container">
                            <h1>+100</h1>
                            <p>PROYECTOS</p>                   
                        </div>
                    </div>
                    <div className="contentBox">
                        <div className="buttonBox">
                            <NavLink to="/register" id="ninth" >
                                <button>REGISTRO PARA PROVEEDORES</button>
                            </NavLink>
                        </div>                      
                    </div>
                </div>
            </div>
            <div className="about__works-container">
                <h1>TRABAJAMOS CON</h1>
                <div className="about__works">
                    <div
                        className="about__work"
                        onMouseEnter={() => handleMouseEnter(1)}
                        onMouseLeave={handleMouseLeave}
                    >  
                        <div className="about__work-img">
                            <img src={hovered === 1 ? Asset7 : Asset1} alt="Icon"/> 
                        </div>                        
                        <h2>OBRA CIVIL</h2>
                        <h2><br></br></h2>
                        <p>TEXTO DESCRIPTIVO SOBRE ESTRUCTURAS Y OBRA CIVIL.</p>
                        <h2 className="about__view-more">VER MÁS</h2>                        
                    </div>
                    <div
                        className="about__work"
                        onMouseEnter={() => handleMouseEnter(2)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="about__work-img">
                            <img src={hovered === 2 ? Asset8 : Asset3} alt="Icon"/> 
                        </div> 
                        <h2>ESTRUCTURA</h2>
                        <h2>METÁLICA</h2>    
                        <p>TEXTO DESCRIPTIVO SOBRE SISTEMAS MEP.</p>  
                        <h2 className="about__view-more">VER MÁS</h2>                     
                    </div>
                    <div
                        className="about__work"
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="about__work-img">
                            <img src={hovered === 3 ? Asset9 : Asset4} alt="Icon"/> 
                        </div>
                        <h2>INGENIERÍAS</h2> 
                        <h2><br></br></h2> 
                        <p>TEXTO DESCRIPTIVO SOBRE HVAC Y ACABADOS.</p>  
                        <h2 className="about__view-more">VER MÁS</h2>                            
                    </div>
                    <div
                        className="about__work"
                        onMouseEnter={() => handleMouseEnter(4)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="about__work-img">
                            <img src={hovered === 4 ? Asset10 : Asset5} alt="Icon"/> 
                        </div>
                        <h2>ACABADOS</h2> 
                        <h2><br></br></h2>  
                        <p>TEXTO DESCRIPTIVO SOBRE INDIRECTOS.</p>   
                        <h2 className="about__view-more">VER MÁS</h2>                          
                    </div>
                    <div
                        className="about__work"
                        onMouseEnter={() => handleMouseEnter(5)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="about__work-img">
                            <img src={hovered === 5 ? Asset11 : Asset6} alt="Icon"/> 
                        </div>
                        <h2>COMPRAS</h2>
                        <h2><br></br></h2>    
                        <p>TEXTO DESCRIPTIVO SOBRE INDIRECTOS.</p> 
                        <h2 className="about__view-more">VER MÁS</h2>                           
                    </div>
                </div>
                <div className="about__client-container">
                    <div className="about__client-overlay">
                        <div className="about__text-client">
                            <h1 className="about__client-h1">CONOCE A NUESTROS CLIENTES</h1>
                        </div>
                    </div>
                </div>               
                
                <div className="about__triangle-container">
                    <div className="about__triangle">
                        <img src={Asset12} alt="Icon" className="about__work-img"/> 
                        <h2>TIEMPO</h2>                        
                    </div>
                    <div className="about__triangle">
                        <img src={Asset13} alt="Icon" className="about__work-img"/> 
                        <h2>COSTO</h2>                      
                    </div>
                    <div className="about__triangle">
                        <img src={Asset14} alt="Icon" className="about__work-img"/> 
                        <h2>CALIDAD</h2>                        
                    </div>                   
                </div>                
            </div>
        </div>
    );
};

export default About;
