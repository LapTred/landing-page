import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import { specialties } from "../specialty/specialtiesData";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Mexico'); // Estado para el país seleccionado

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  return (
    <div className="register">            
      <div className="register__container-left">
        <img src={background} alt="Background" className="register__background"/> 
        <div className="register__overlay">
          <div className="register__text-container">
            <h1>REGISTRO PARA ALTA DE PROVEEDORES ATISA</h1>
            <div className="register__red-line"></div>
            <p className="register__text-p">
              EN ATISA SIEMPRE ESTAMOS EN CONSTANTE CRECIMIENTO, POR ELLO, NECESITAMOS PROVEEDORES COMO TÚ. COMPROMETIDOS Y CON UN MISMO OBJETIVO: CRECIMIENTO CONSTANTE Y TRABAJO MUTUO PARA ALCANZAR LA META CON LOS ESTÁNDARES DE LA EMPRESA.
            </p>
          </div>                    
        </div>      
      </div>   
      <div className="register__container-right">
        <div className="register__container-scroll">
        <div className="register__formulario-container">
            <form className="register__form">
                <h2>I.- INFORMACIÓN DE LA EMPRESA</h2>
                <p>Completa los campos marcados con (*) para poder continuar con la solicitud</p>
                <div className="register__gray-line"></div>
                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                        <p>Razón social *</p>
                    </div>                            
                    <div className="register__input">
                        <input type="text" className="register__textInput"/>
                        <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CONSTRUCTURA DE LA BAJA)</p>
                    </div>
                </div>    

                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                        <p>RFC *</p>
                    </div>                            
                    <div className="register__input">
                        <input type="text" className="register__textInput"/>
                        <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CDB750806B2N)</p>
                    </div>
                </div>  

                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                        <p>Dirección Fiscal *</p>
                    </div>                            
                    <div className="register__input">
                        <input type="text" placeholder="Calle y número" className="register__textInput"/>
                        <input type="text" placeholder="Colonia" className="register__textInput"/>
                        <input type="text" placeholder="Código Postal" className="register__textInput"/>
                        <input type="text" placeholder="Ciudad" className="register__textInput"/>
                        <input type="text" placeholder="Estado" className="register__textInput"/>
                        <select className="register__textInput" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                        <option value="" disabled>Selecciona tu país</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                        </select>
                        <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal</p>
                    </div>                            
                </div>   

                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                        <p>Especialidad *</p>
                    </div>                            
                    <div className="register__input">
                        <select className="register__textInput">
                        <option value="" disabled selected>Selecciona tu especialidad</option>
                        {specialties.map(category => (
                            <optgroup key={category.id} label={category.title}>
                            {category.content.map(specialty => (
                                <option key={specialty.id} value={specialty.title}>{specialty.title}</option>
                            ))}
                            </optgroup>
                        ))}
                        </select>
                        <p>Para seleccionar la especialidad adecuada. Te compartimos un documento que contiene una descripción de las especialidades disponibles.</p>          
                    </div>                            
                </div>  
                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                    <a className="register__link" href="https://www.atisa.com/cadena_de_suministros/tabla_especialidades.pdf" target="_blank" rel="noopener noreferrer">Tabla de Especialidades</a>
                    </div>     
                </div>     
                <div className="register__inputWrapper flex">                            
                    <div className="register__label">
                        <p>Alcances *</p>
                    </div>                            
                    <div className="register__input">
                        <textarea type="text" className="register__textInput"/>
                        <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CDB750806B2N)</p>
                    </div>
                </div>                

                <h2>II.- DATOS DE CONTACTO</h2>            
                <h2>III.- DOCUMENTOS</h2>
            </form>                    
        </div>
        </div>
        
      </div>           
    </div>
  );
};

export default Register;
