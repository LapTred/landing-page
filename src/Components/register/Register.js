import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import RegisterUploader from './RegisterUploader.js';
import RegisterSpecialities from "./RegisterSpecialities.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Mexico'); // Estado para el país seleccionado
  const query = useQuery();
  const tipo = query.get('tipo');  
  const persona = query.get('persona');

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
                  <RegisterSpecialities tipo={tipo}/> {/* Pasar el parámetro tipo */}
                </div>
              </div>
              <h2>II.- DOCUMENTOS</h2>
              <p>Favor de subir y enviar los documentos enlistados a continuación. Completa los campos marcados con (*) para poder continuar con la solicitud.</p>
              
              <RegisterUploader tipo={tipo}  persona={persona}/> {/* Pasar el parámetro tipo */}
              <div className="flex justifyRight">
                <button className="register__button-form" type="button">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
