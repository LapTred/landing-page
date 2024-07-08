import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import { specialties } from "../specialty/specialtiesData";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Uploader from '../uploader/Uploader.js';

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Mexico'); // Estado para el país seleccionado
  const [phone1, setPhone1] = useState()
  const [phone2, setPhone2] = useState()
  const documentList = [
    "Curriculum de la empresa (pdf)",
    "Catálogo de productos (proveedores) (pdf)",
    "Solicitud de crédito y requisitos (proveedores) (pdf)",
    "Acta Constitutiva (aplica solamente cuando es persona moral) (pdf)",
    "Poder Legal (aplica solamente cuando es persona moral) (pdf)",
    "INE representante legal (.jpg /. png)",
    "Constancia de Situación Fiscal (pdf)",
    "REPSE (pdf)",
    "Tarjeta Patronal (.jpg / .png)",
    "Última liquidación IMSS (pdf)",
    "Opinión de cumplimiento IMSS, SA (pdf)"
  ];

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
              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>Razón social *</p>
                  </div>                            
                  <div className="register__input column">
                      <input type="text" className="register__textInput"/>
                      <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CONSTRUCTURA DE LA BAJA)</p>
                  </div>
              </div>    

              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>RFC *</p>
                  </div>                            
                  <div className="register__input column">
                      <input type="text" className="register__textInput"/>
                      <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CDB750806B2N)</p>
                  </div>
              </div>  

              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>Dirección Fiscal *</p>
                  </div>                            
                  <div className="register__input column">
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

              <div className="register__inputWrapper">                            
                <div className="register__label">
                    <p>Especialidad *</p>
                </div>                            
                <div className="register__input column">
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
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <a className="register__link" href="https://www.atisa.com/cadena_de_suministros/tabla_especialidades.pdf" target="_blank" rel="noopener noreferrer">Tabla de Especialidades</a>
                </div>     
              </div>     
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <p>Alcances *</p>
                </div>                            
                <div className="register__input column">
                  <textarea type="text" className="register__textInput" placeholder="1.-&#10;2.-&#10;3.-&#10;" />
                  <p>De acuerdo a la especialidad elegida, favor de indicar 3 (tres) principales alcances de forma general.</p>
                </div>
              </div>                

              <h2>II.- DATOS DE CONTACTO</h2>                 
              <div className="register__gray-line"></div>  
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <p>Ejecutivo de ventas *</p>
                </div>                            
                <div className="register__input">
                  <input type="text" placeholder="Nombre" className="register__textInput"/>
                  <input type="text" placeholder="Apellido" className="register__textInput"/>                  
                </div>                  
              </div>                
              <div className="register__inputWrapper"></div>
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <p>Teléfono *</p>
                </div>                            
                <div className="register__input column">
                  <PhoneInput                    
                    countryCodeEditable = {false}
                    country="mx"
                    placeholder="Enter phone number"
                    className="register__phoneInput"
                    value={phone1}
                    onChange={setPhone1}
                  />
                  <p>Número de teléfono del ejecutivo de ventas</p>
                </div>                    
              </div> 
              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>Correo electrónico *</p>
                  </div>                            
                  <div className="register__input column">
                      <input type="text" placeholder="email@empresa.com" className="register__textInput"/>
                      <p>Correo electrónico del ejecutivo de ventas</p>
                  </div>
              </div> 
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <p>Dirección / Gerencia</p>
                </div>                            
                <div className="register__input">
                  <input type="text" placeholder="Nombre" className="register__textInput"/>
                  <input type="text" placeholder="Apellido" className="register__textInput"/>                  
                </div>                  
              </div>       
              <div className="register__inputWrapper"></div>
              <div className="register__inputWrapper">                            
                <div className="register__label">
                  <p>Teléfono *</p>
                </div>                            
                <div className="register__input column">
                  <PhoneInput
                    countryCodeEditable = {false}
                    country="mx"
                    placeholder="Enter phone number"
                    className="register__phoneInput"
                    value={phone2}
                    onChange={setPhone2}
                  />
                  <p>Número de teléfono del director / gerente</p>
                </div>                    
              </div> 
              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>Correo electrónico *</p>
                  </div>                            
                  <div className="register__input column">
                      <input type="text" placeholder="email@empresa.com" className="register__textInput"/>
                      <p>Correo electrónico del director / gerente</p>
                  </div>
              </div> 
              <h2>III.- DOCUMENTOS</h2>              
              <div className="register__gray-line"></div>
              <div className="register__label-document column">   
                <p>Favor de subir y enviar los documentos enlistados a continuación en caso de aplicar según sea el giro y la especialidad de su empresa.</p>
                <br></br>
                <div>
                  {documentList.map((doc, index) => (
                    <p key={index}>{index + 1}. {doc}</p>
                  ))}
                </div>  
              </div> 
              <div className="register__inputWrapper">                            
                  <div className="register__label">
                      <p>Subir archivos *</p>
                  </div>                            
                  <div className="register__input column">                      
                      <Uploader/> 
                      <p>Sube hasta 11 archivos en este apartado de hasta 40MB</p>
                  </div>
              </div>
            </form>                    
          </div>
        </div>        
      </div>           
    </div>
  );
};

export default Register;
