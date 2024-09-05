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

const statesOfMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Mexico', 'Mexico City', 'Michoacán', 'Morelos',
  'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
  'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala',
  'Veracruz', 'Yucatán', 'Zacatecas'
];

const countriesList = ['Mexico', 'Estados Unidos'];

const Register = () => {
  const [selectedCountry, setSelectedCountry] = useState('Mexico');
  const [formValues, setFormValues] = useState({
    razonSocial: '',
    rfc: '',
    calleNumero: '',
    colonia: '',
    codigoPostal: '',
    ciudad: '',
    estado: '',
  });
  const [errors, setErrors] = useState({});
  const query = useQuery();
  const tipo = query.get('tipo');
  const persona = query.get('persona');

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9\s]{1,150}$/.test(formValues.razonSocial)) {
      newErrors.razonSocial = 'La razón social solo puede contener letras y números sin caracteres especiales.';
    }

    if (!/^[a-zA-Z0-9]{1,20}$/.test(formValues.rfc)) {
      newErrors.rfc = 'El RFC solo puede contener letras y números.';
    }

    if (!/^[a-zA-Z0-9\s]{1,100}$/.test(formValues.calleNumero)) {
      newErrors.calleNumero = 'La dirección solo puede contener letras y números.';
    }

    if (!/^[a-zA-Z0-9\s]{1,150}$/.test(formValues.colonia)) {
      newErrors.colonia = 'La colonia solo puede contener letras y números.';
    }

    if (!/^\d{1,8}$/.test(formValues.codigoPostal)) {
      newErrors.codigoPostal = 'Código postal no válido.';
    }

    if (formValues.estado.length > 30 || !/^[a-zA-Z\s]*$/.test(formValues.estado)) {
      newErrors.estado = 'El estado debe tener un máximo de 30 letras.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Formulario enviado:', formValues);
    }
  };

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
            <form className="register__form" onSubmit={handleSubmit}>
              <h2>I.- INFORMACIÓN DE LA EMPRESA</h2>
              <p>Completa los campos marcados con (*) para poder continuar con la solicitud</p>
              <div className="register__gray-line"></div>
              <div className="register__inputWrapper">
                <div className="register__label">
                  <p>Razón social *</p>
                </div>
                <div className="register__input column">
                  <input
                    type="text"
                    name="razonSocial"
                    value={formValues.razonSocial}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.razonSocial && <p className="error-text">{errors.razonSocial}</p>}
                  <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CONSTRUCTURA DE LA BAJA)</p>
                </div>
              </div>
              <div className="register__inputWrapper">
                <div className="register__label">
                  <p>RFC *</p>
                </div>
                <div className="register__input column">
                  <input
                    type="text"
                    name="rfc"
                    value={formValues.rfc}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.rfc && <p className="error-text">{errors.rfc}</p>}
                  <p>Favor de escribirlo tal cual viene en su Constancia de Situación Fiscal, sin guiones ni espacios. (Ej. CDB750806B2N)</p>
                </div>
              </div>
              <div className="register__inputWrapper">
                <div className="register__label">
                  <p>Dirección Fiscal *</p>
                </div>
                <div className="register__input column">
                  <input
                    type="text"
                    name="calleNumero"
                    placeholder="Calle y número"
                    value={formValues.calleNumero}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.calleNumero && <p className="error-text">{errors.calleNumero}</p>}
                  <input
                    type="text"
                    name="colonia"
                    placeholder="Colonia"
                    value={formValues.colonia}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.colonia && <p className="error-text">{errors.colonia}</p>}
                  <input
                    type="text"
                    name="codigoPostal"
                    placeholder="Código Postal"
                    value={formValues.codigoPostal}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.codigoPostal && <p className="error-text">{errors.codigoPostal}</p>}
                  <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad"
                    value={formValues.ciudad}
                    onChange={handleChange}
                    className="register__textInput"
                  />
                  {errors.ciudad && <p className="error-text">{errors.ciudad}</p>}
                  {selectedCountry === 'Mexico' ? (
                    <select
                      name="estado"
                      value={formValues.estado}
                      onChange={handleChange}
                      className="register__textInput"
                    >
                      <option value="" disabled>Selecciona tu estado</option>
                      {statesOfMexico.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="estado"
                      placeholder="Estado"
                      value={formValues.estado}
                      onChange={handleChange}
                      className="register__textInput"
                    />
                  )}
                  {errors.estado && <p className="error-text">{errors.estado}</p>}
                  <select
                    className="register__textInput"
                    name="country"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                  >
                    {countriesList.map(country => (
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
              
              <RegisterUploader tipo={tipo} persona={persona}/> {/* Pasar el parámetro tipo */}
              <div className="flex justifyRight">
                <button className="register__button-form" type="submit">
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
