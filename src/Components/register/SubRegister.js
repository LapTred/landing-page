import React, {useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTokenContext } from '../../context/TokenContext'; // Importa el contexto
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from 'axios';
import md5 from 'md5';

async function loginEmail(credential) {
  const hash = md5(credential.password);
  const body = {              
    'email': credential.email.toLowerCase(),
    'pass': hash,
  };

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_GET_COMPRAS_USERS}`, body);
    if (res.status === 200) {
        return res.data;
    }
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return null;
  }    
}    

const Preregister = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Estado de carga inicial
  const navigate = useNavigate();
  const { token } = useTokenContext(); // Obtén el token del contexto  
  const { setToken } = useTokenContext(); // Usa el contexto para setear el token

  useEffect(() => {
    if (token) {
      navigate(`/postregister`);
    } else {
      setLoading(false); // Finaliza la carga si no hay token
    }
  }, [token, navigate]); // Incluye 'navigate' en la lista de dependencias

  const handleSubmit = async (e) => {
      e.preventDefault();
      const token = await loginEmail({ email, password });
      if (token && Object.keys(token).length > 0) {
          setToken(token); // Usa el contexto para setear el token
          navigate(`/postregister`);
      } else {
          console.error("Token inválido o vacío:", token);
      }
  };
 

  const options1 = [
    { value: 'proveedor', label: 'Compras generales' },
    { value: 'subcontrato', label: 'Subcontratistas' },
    { value: 'subcontrato-proveedor', label: 'Ambos' },
  ];

  const options2 = [
    { value: 'moral', label: 'Persona Moral' },
    { value: 'fisica', label: 'Persona Física' },
  ];

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const parsedNumber = parsePhoneNumberFromString(`+${phone}`);
    return parsedNumber ? parsedNumber.isValid() : false;
  };

  const handleChange = (field, value) => {
    const newErrors = { ...errors };
    let fieldValue = value;

    if (typeof value === 'object' && value !== null && 'value' in value) {
      fieldValue = value.value;
    }

    switch (field) {
      case 'name':
        if (!fieldValue.trim()) {
          newErrors.name = 'El nombre es obligatorio';
        } else {
          delete newErrors.name;
        }
        break;
      case 'lastName':
        if (!fieldValue.trim()) {
          newErrors.lastName = 'El apellido es obligatorio';
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'email':
        if (!validateEmail(fieldValue)) {
          newErrors.email = 'El correo electrónico no es válido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!validatePassword(fieldValue)) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres y un número';
        } else {
          delete newErrors.password;
        }
        break;
      case 'confirmPassword':
        if (fieldValue !== password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'phone1':
        if (!validatePhoneNumber(fieldValue)) { 
          newErrors.phone1 = 'El número de teléfono no es válido';
        } else {
          delete newErrors.phone1;
        }
        break;
      case 'selectedOption1':
        if (!fieldValue) {
          newErrors.selectedOption1 = 'Selecciona un tipo';
        } else {
          delete newErrors.selectedOption1;
        }
        break;
      case 'selectedOption2':
        if (!fieldValue) {
          newErrors.selectedOption2 = 'Selecciona un tipo de contribuyente';
        } else {
          delete newErrors.selectedOption2;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleContinue = async () => {
    if (validateForm()) {
        const nombre = name;
        const apellido = lastName;
        const telefono = phone1;
        const emailAddress = email;
        const pass = md5(password);

        const cgeneral = selectedOption1 && (selectedOption1.value === 'proveedor' || selectedOption1.value === 'subcontrato-proveedor') ? 1 : 0;
        const subcontratista = selectedOption1 && (selectedOption1.value === 'subcontrato' || selectedOption1.value === 'subcontrato-proveedor') ? 1 : 0;
        const tipoCont = selectedOption2 && (selectedOption2.value === 'moral' ? 1 : 2);

        const body = {
            nombre,
            apellido,
            telefono,
            email: emailAddress.toLowerCase(),
            pass,
            cgeneral,
            subcontratista,
            tipoCont,
        };

        // Declara newErrors aquí
        const newErrors = {};

        try {
            const res = await axios.post(process.env.REACT_APP_API_HOST + "/compras/setUser", body);
            if (res.status === 200) {
                const data = res.data;

                // Verifica si el resultado solo contiene el id
                if (data.length === 1 && data[0].id) {
                    console.error('Ya existe un usuario con este correo:', emailAddress);
                    newErrors.email = 'Ya existe una cuenta asociada a este correo';
                    setErrors(newErrors); // Actualiza el estado de errores
                } else {
                    console.log('Usuario registrado exitosamente:', data);
                    setIsCompleted(true);
                }
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    }
};



  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!lastName) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!phone1) {
      newErrors.phone1 = 'El teléfono es obligatorio';
    } else if (!validatePhoneNumber(phone1)) { 
      newErrors.phone1 = 'El número de teléfono no es válido';
    }

    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria.';
    } else if (!validatePassword(password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres y un número';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma la contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!selectedOption1) {
      newErrors.selectedOption1 = 'Selecciona un tipo';
    }

    if (!selectedOption2) {
      newErrors.selectedOption2 = 'Selecciona un tipo de contribuyente';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se verifica el token
  }

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
                  <div className="register__input column">
                    <div className='flex register__input-gap'>
                      <input 
                        type="text" 
                        placeholder="Nombre" 
                        className={`register__textInput ${errors.name ? 'error' : ''}`}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          handleChange('name', e.target.value);
                        }}
                      />
                      <input 
                        type="text" 
                        placeholder="Apellido" 
                        className={`register__textInput ${errors.lastName ? 'error' : ''}`}
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          handleChange('lastName', e.target.value);
                        }}
                      />
                    </div>
                    {errors.name && <p className="error-text">{errors.name}</p>}
                    {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Teléfono *</p>
                  </div>
                  <div className="register__input column">
                    <PhoneInput
                      countryCodeEditable={false}
                      onlyCountries={['us', 'mx']} // Restringe a solo EE. UU. y México
                      country="mx"
                      placeholder="Enter phone number"
                      className={`register__phoneInput ${errors.phone1 ? 'error' : ''}`}
                      value={phone1}
                      onChange={(value) => {
                        setPhone1(value);
                        handleChange('phone1', value);
                      }}
                    />
                    {errors.phone1 && <p className="error-text">{errors.phone1}</p>}
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Correo electrónico *</p>
                  </div>
                  <div className="register__input column">
                    <input 
                      type="text" 
                      placeholder="email@empresa.com" 
                      className={`register__textInput ${errors.email ? 'error' : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleChange('email', e.target.value);
                      }}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                    <p>Correo electrónico del ejecutivo de ventas</p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p className="inputLabel">Contraseña *</p>
                  </div>
                  <div className="register__input column">
                    <input 
                      type="password" 
                      placeholder="Contraseña" 
                      className={`register__textInput ${errors.password ? 'error' : ''}`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        handleChange('password', e.target.value);
                      }}
                    />
                    {errors.password && <p className="error-text">{errors.password}</p>}
                    <p>Debe contener al menos 8 caracteres y un número</p>
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p className="inputLabel">Confirmar contraseña *</p>
                  </div>
                  <div className="register__input column">
                    <input 
                      type="password" 
                      placeholder="Repetir contraseña" 
                      className={`register__textInput ${errors.confirmPassword ? 'error' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        handleChange('confirmPassword', e.target.value);
                      }}
                    />
                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Selecciona un tipo * </p>
                  </div>
                  <div className="register__input column">
                    <div className='register__input-select'>
                      <Select
                        className={`register__select-first ${errors.selectedOption1 ? 'error' : ''}`}
                        options={options1}
                        isSearchable={false}
                        placeholder="Compras generales o Subcontratista"
                        onChange={(value) => {
                          setSelectedOption1(value);
                          handleChange('selectedOption1', value);
                        }}
                      />
                    </div>                    
                    {errors.selectedOption1 && <p className="error-text">{errors.selectedOption1}</p>}
                  </div>
                </div>
                <div className="register__inputWrapper">
                  <div className="register__label">
                    <p>Tipo de contribuyente * </p>
                  </div>
                  <div className="register__input column">
                    <div className='register__input-select'>
                      <Select
                        className={`register__select-first ${errors.selectedOption2 ? 'error' : ''}`}
                        options={options2}
                        isSearchable={false}
                        placeholder="Persona moral o física"
                        onChange={(value) => {
                          setSelectedOption2(value);
                          handleChange('selectedOption2', value);
                        }}
                      />
                    </div>                    
                    {errors.selectedOption2 && <p className="error-text">{errors.selectedOption2}</p>}
                  </div>
                </div>
                <div className="flex spaceBetween centerItems">
                  <p>SI YA TIENES CUENTA, &nbsp;
                        <NavLink to="/login" className="register-link">INICIA SESIÓN AQUÍ</NavLink>
                  </p>
                  <button className="register__button-form" type="button" onClick={handleContinue}>
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="register__completion-message">
              <h2>¡Gracias por finalizar tu pre-registro!</h2>
              <br></br>
              <p className='register__label-message'>Es necesario que completes tu perfil para participar en nuestras licitaciones. Continúa con la carga de archivos para finalizar tu registro.</p>
              <br></br>
              <div className="flex justifyRight">
                  <button className="register__button-form" type="button" onClick={handleSubmit}>
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