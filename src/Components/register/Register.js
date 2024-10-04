import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./Register.css";
import background from "../../assets/Landing/Registro.JPG";
import RegisterUploader from './RegisterUploader.js';
import RegisterSpecialities from "./RegisterSpecialities.js";
import axios from 'axios';
import { useTokenContext } from '../../context/TokenContext'; // Importa el contexto
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la redirección


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
    estado: 'Baja California', // Valor por defecto
  });

  const [uploadedFiles, setUploadedFiles] = useState([]); // Estado para almacenar los archivos subidos
  const [errors, setErrors] = useState({});
  const [documentsError, setDocumentsError] = useState(''); // Nuevo estado para error de documentos
  const { token } = useTokenContext();
  const navigate = useNavigate(); // Inicializa useNavigate para redirigir

  const [selectedSpecialties, setSelectedSpecialties] = useState([
    { specialty: '', scope: [], options: [] }
  ]);

  useEffect(() => {
    if (!token) {
      navigate('/register');
    } else if (token.documentado === true) {
      navigate('/reverse-auction');
    } 
  }, [token, navigate]);
  
  const [documentsComplete, setDocumentsComplete] = useState(false);

  const handleFilesChange = useCallback((files) => {
    setUploadedFiles(files);
  }, []);
  
  const handleDocumentsComplete = useCallback((complete) => {
    setDocumentsComplete(complete);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9\s]{1,150}$/.test(formValues.razonSocial)) {
      newErrors.razonSocial = 'La razón social solo puede contener letras y números sin caracteres especiales.';
    }

    if (!/^[a-zA-Z0-9]{1,20}$/.test(formValues.rfc)) {
      newErrors.rfc = 'Campo obligatorio. Solo puede contener letras y números.';
    }

    if (!/^[a-zA-Z0-9\s]{1,100}$/.test(formValues.calleNumero)) {
      newErrors.calleNumero = 'Campo obligatorio. Solo puede contener letras y números.';
    }

    if (!/^[a-zA-Z0-9\s]{1,150}$/.test(formValues.colonia)) {
      newErrors.colonia = 'Campo obligatorio. Solo puede contener letras y números.';
    }

    if (!/^[a-zA-Z0-9\s]{1,150}$/.test(formValues.ciudad)) {
      newErrors.ciudad = 'Campo obligatorio. Solo puede contener letras y números.';
    }

    if (!/^\d{1,8}$/.test(formValues.codigoPostal)) {
      newErrors.codigoPostal = 'Código postal no válido.';
    }

    if (formValues.estado.length > 30 || !/^[a-zA-Z\s]*$/.test(formValues.estado)) {
      newErrors.estado = 'El estado debe tener un máximo de 30 letras.';
    }

    const validSpecialties = selectedSpecialties.every(spec => spec.specialty && spec.scope.length > 0);
    if (!validSpecialties) {
      newErrors.specialties = 'Selecciona una especialidad y su alcance correspondiente.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Validate the specific field being changed
    if (name === 'razonSocial') {
      if (!/^[a-zA-Z0-9\s]{1,150}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          razonSocial: 'La razón social solo puede contener letras y números sin caracteres especiales.'
        }));
      } else {
        setErrors(prevErrors => {
          const { razonSocial, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'rfc') {
      if (!/^[a-zA-Z0-9]{1,20}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          rfc: 'Campo obligatorio. Solo puede contener letras y números.'
        }));
      } else {
        setErrors(prevErrors => {
          const { rfc, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'calleNumero') {
      if (!/^[a-zA-Z0-9\s]{1,100}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          calleNumero: 'Campo obligatorio. Solo puede contener letras y números.'
        }));
      } else {
        setErrors(prevErrors => {
          const { calleNumero, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'colonia') {
      if (!/^[a-zA-Z0-9\s]{1,150}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          colonia: 'Campo obligatorio. Solo puede contener letras y números.'
        }));
      } else {
        setErrors(prevErrors => {
          const { colonia, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'ciudad') {
      if (!/^[a-zA-Z0-9\s]{1,150}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          ciudad: 'Campo obligatorio. Solo puede contener letras y números.'
        }));
      } else {
        setErrors(prevErrors => {
          const { ciudad, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'codigoPostal') {
      if (!/^\d{1,8}$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          codigoPostal: 'Código postal no válido.'
        }));
      } else {
        setErrors(prevErrors => {
          const { codigoPostal, ...rest } = prevErrors;
          return rest;
        });
      }
    } else if (name === 'estado') {
      if (value.length > 30 || !/^[a-zA-Z\s]*$/.test(value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          estado: 'El estado debe tener un máximo de 30 letras.'
        }));
      } else {
        setErrors(prevErrors => {
          const { estado, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

   // Refs para los campos del formulario
   const refs = {
    razonSocial: useRef(null),
    rfc: useRef(null),
    calleNumero: useRef(null),
    colonia: useRef(null),
    codigoPostal: useRef(null),
    ciudad: useRef(null),
    estado: useRef(null),
    specialties: useRef(null)
  };

  const uploadImages = async (file) => {
    if (file === undefined) {
        return;
    }
    const fd = new FormData();
    fd.append('file', file);

    try {
        const res = await axios.post(process.env.REACT_APP_API_HOST + "upload", fd);
        console.log(res.data.filename);
        return res.data.filename; // Devuelve el nombre del archivo subido
    } catch (err) {
        alert("No se pudo subir el archivo. \n Inténtelo de nuevo.");
        console.log(err);
        return null; // Devuelve null si hay un error
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (validate() && documentsComplete) {
          const rs = formValues.razonSocial;
          const calle = formValues.calleNumero;   
          const colonia = formValues.colonia;  
          const cp = formValues.codigoPostal;
          const ciudad = formValues.ciudad;
          const estado = formValues.estado;
          const pais = selectedCountry; 
          const usuario = token.id;
          const rfc = formValues.rfc;

          const body = {
              rs,
              rfc,
              calle,
              cp,
              pais,
              ciudad,
              usuario,
              colonia,
              estado,
          };

          // Log toda la información que se va a enviar
          console.log('Información a enviar:', {
              userInfo: body,
              selectedSpecialties: selectedSpecialties,
              uploadedFiles, // Muestra los archivos subidos en la consola
          });

          try {
              // Enviar la información del usuario
              const res = await axios.post(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_SET_COMPRAS_INFO}`, body);
              if (res.status === 200) {
                  const data = res.data;
                  console.log('Usuario registrado exitosamente:', data);
                  
                  // Subir archivos y obtener los nombres de los archivos subidos
                  const uploadedFilenames = await Promise.all(
                      uploadedFiles.flatMap(files => 
                          files.map(({ file }) => uploadImages(file))
                      )
                  );

                  // Filtra los nombres de archivos válidos
                  const validFilenames = uploadedFilenames.filter(filename => filename !== null);

                  // Envía especialidades
                  for (const specialty of selectedSpecialties) {
                      if (specialty.specialty) {
                          await axios.post(process.env.REACT_APP_API_HOST + "/compras/setEspecialidad", {
                              eid: specialty.id, 
                              usuario,
                          });
                      }
                  }

                  // Envía alcances
                  for (const specialty of selectedSpecialties) {
                      if (specialty.scope.length > 0) {
                          for (const scope of specialty.scope) {
                              await axios.post(process.env.REACT_APP_API_HOST + "/compras/setAlcance", {
                                  aid: scope.id,
                                  usuario,
                              });
                          }
                      }
                  }

                  // Envía los archivos subidos a setDoc
                  for (const [index, fileArray] of uploadedFiles.entries()) {
                      for (const { id } of fileArray) {
                          const filename = validFilenames[index];
                          if (filename) {
                              await axios.post(process.env.REACT_APP_API_HOST + "/compras/setDoc", {
                                  nombreDoc: filename,
                                  idDoc: id,
                                  idUsr:token.id,
                              });
                          }
                      }
                  }

                  console.log('Archivos subidos:', validFilenames);
                  try {
                    const response = await axios.post(`${process.env.REACT_APP_API_HOST}/compras/updateUsrDocs`, {                    
                      usr: token.id,
                    });

                    if (response.data === "success") {                      
                      token.documentado = true;
                      navigate('/reverse-auction');
                    } else {
                      console.error('Error al actualizar los documentos del usuario');
                    }
                  } catch (error) {
                    console.error('Error en la solicitud para actualizar documentos del usuario:', error);
                  }
              }
          } catch (error) {
              console.error('Error al registrar usuario:', error);
              return;
          }

          console.log('Formulario enviado:', formValues);
      } else {      
          // Desplazar al primer error
          const firstErrorKey = Object.keys(errors)[0];
          if (refs[firstErrorKey] && refs[firstErrorKey].current) {
              refs[firstErrorKey].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }      
          if (!documentsComplete) {
              setDocumentsError('Por favor, sube todos los documentos obligatorios.');
          } else {
              setDocumentsError(''); // Limpiar error de documentos si ya está completo
          }
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
              <div className="register__inputWrapper" ref={refs.razonSocial}>
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
              <div className="register__inputWrapper" ref={refs.rfc}>
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
              <div className="register__inputWrapper" ref={refs.calleNumero}>
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
                      ref={refs.estado}
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
                      ref={refs.estado}
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
              <div className="register__inputWrapper" ref={refs.specialties}>
                <div className="register__label">
                  <p>Especialidad *</p>
                </div>
                <div className="register__input column">
                  <RegisterSpecialities selectedSpecialties={selectedSpecialties} setSelectedSpecialties={setSelectedSpecialties} />
                  {errors.specialties && <p className="error-text">{errors.specialties}</p>}
                </div>
              </div>
              <h2>II.- DOCUMENTOS</h2>
              {documentsError && <p className="error-text">{documentsError}</p>} {/* Mostrar error de documentos */}
              
              <p>Favor de subir y enviar los documentos enlistados a continuación. Completa los campos marcados con (*) para poder continuar con la solicitud.</p>
              {token && (
                <RegisterUploader 
                  onDocumentsComplete={handleDocumentsComplete} 
                  onFilesChange={handleFilesChange} 
                />
              )}              
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
