import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';

const Preregister = () => {
  const [phone1, setPhone1] = useState();
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const options1 = [
    { value: 'proveedor', label: 'Compras generales' },
    { value: 'subcontrato', label: 'Subcontratistas' },
  ];

  const options2 = [
    { value: 'moral', label: 'Persona Moral' },
    { value: 'fisica', label: 'Persona Física' },
  ];

  const handleContinue = () => {
    if (selectedOption1 && selectedOption2) {
      // Aquí cambiamos el estado a "completado" en lugar de navegar
      setIsCompleted(true);
    } else {
      alert('Por favor selecciona un tipo y un tipo de contribuyente.');
    }
  };

  const handleContinue2 = () => {
    if (selectedOption1 && selectedOption2) {
      navigate(`/postregister?tipo=${selectedOption1.value}&persona=${selectedOption2.value}`);
    } else {
      return;
    }
  };

  return (
    <div className="register">
      <div className="register__container-left">
        <img src={background} alt="Background" className="register__background" />
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
          {!isCompleted ? (
            <div className="register__formulario-container">
              <form className="register__form">
                <h2>DATOS DE CONTACTO</h2>
                <div className="register__gray-line"></div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Ejecutivo de ventas *</p>
                  </div>
                  <div className="register__input">
                    <input type="text" placeholder="Nombre" className="register__textInput" />
                    <input type="text" placeholder="Apellido" className="register__textInput" />
                  </div>
                </div>
                <div className="register__inputWrapper"></div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Teléfono *</p>
                  </div>
                  <div className="register__input column">
                    <PhoneInput
                      countryCodeEditable={false}
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
                    <input type="text" placeholder="email@empresa.com" className="register__textInput" />
                    <p>Correo electrónico del ejecutivo de ventas</p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p className="inputLabel">Contraseña *</p>
                  </div>
                  <div className="register__input column">
                    <input type="password" placeholder="Contraseña" className="register__textInput" />
                    <p>Debe contener al menos 6 caracteres</p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p className="inputLabel">Confirmar contraseña *</p>
                  </div>
                  <div className="register__input column">
                    <input type="password" placeholder="Repetir contraseña" className="register__textInput" />
                    <p></p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Selecciona un tipo * </p>
                  </div>
                  <div className="register__input column">
                    <div className='register__input-select'>
                      <Select
                        className="register__select-first"
                        options={options1}
                        isSearchable={false}
                        placeholder="Compras generales o Subcontratista"
                        onChange={setSelectedOption1}
                      />
                    </div>
                    <p></p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Tipo de contribuyente * </p>
                  </div>
                  <div className="register__input column">
                    <div className='register__input-select'>
                      <Select
                        className="register__select-first"
                        options={options2}
                        isSearchable={false}
                        placeholder="Persona moral o física"
                        onChange={setSelectedOption2}
                      />
                    </div>
                    <p></p>
                  </div>
                </div>
                <div className="flex justifyRight">
                  <button className="register__button-form" type="button" onClick={handleContinue}>
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="register__completion-message">              
              <h2>¡Pre-registro completado!</h2> 
              <br></br>             
              <p className='register__label-message'>Gracias por completar tu pre-registro. Puedes continuar con la subida de archivos o iniciar sesión más tarde para completar tu registro.</p>  
              <br></br>              
              <div className="flex justifyRight">
                  <button className="register__button-form" type="button" onClick={handleContinue2}>
                    Subir archivos
                  </button>
                </div>
            </div>            
          )}
        </div>
      </div>
    </div>
  );
};

export default Preregister;
