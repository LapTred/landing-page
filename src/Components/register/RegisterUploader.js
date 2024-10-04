import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./Register.css";
import Uploader from '../uploader/Uploader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf as faFilePdfRegular, faImage as faImageRegular } from '@fortawesome/free-regular-svg-icons';
import { useTokenContext } from '../../context/TokenContext'; // Importa el contexto


const documentIDs = {
  "Constancia de Situación Fiscal (.pdf)": 7,
  "Comprobante de domicilio (.pdf)": 12,
  "Catálogo de productos (.pdf)": 2,
  "Solicitud de crédito y requisitos (.pdf)": 3,
  "Curriculum de la empresa (.pdf)": 1,
  "Caratula bancaria (.pdf)": 13,
  "INE representante legal (.jpg /.png)": 6,
  "REPSE (.pdf)": 8,
  "Tarjeta Patronal (.jpg /.png)": 9,
  "Última liquidación IMSS (.pdf)": 10,
  "Opinión de cumplimiento IMSS, SA (.pdf)": 11,
  "Acta Constitutiva (.pdf)": 4,
  "Poder Legal (.pdf)": 5
};

const RegisterUploader = ({ onDocumentsComplete, onFilesChange }) => {

  const { token } = useTokenContext();
  const persona = token.tipoCont === 1 ? 'moral' : 'fisica';
  const tipo = token.subcontratista === true ? 'subcontrato' : 'proveedor';


  console.log(token);
  console.log('Tipo:', tipo);
  console.log('Persona:', persona);
  
  // Proveedor y persona moral
  const documentList1 = useMemo(() => [
    "Constancia de Situación Fiscal (.pdf) *",
    "Comprobante de domicilio (.pdf) *",
    "Catálogo de productos (.pdf)",
    "Solicitud de crédito y requisitos (.pdf)",
    "Curriculum de la empresa (.pdf)",
    "Caratula bancaria (.pdf)"
  ], []);

  // Subcontratista y persona física
  const documentList2 = useMemo(() => [
    "Curriculum de la empresa (.pdf) *",
    "INE representante legal (.jpg /.png) *",
    "REPSE (.pdf) *",
    "Tarjeta Patronal (.jpg /.png) *",
    "Última liquidación IMSS (.pdf) *",
    "Opinión de cumplimiento IMSS, SA (.pdf) *"
  ], []);

  // Subcontratista y persona moral
  const documentList3 = useMemo(() => [
    "Curriculum de la empresa (.pdf) *",
    "Acta Constitutiva (.pdf) *",
    "Poder Legal (.pdf) *",
    "INE representante legal (.jpg /.png) *",
    "REPSE (.pdf) *",
    "Tarjeta Patronal (.jpg /.png) *",
    "Última liquidación IMSS (.pdf) *",
    "Opinión de cumplimiento IMSS, SA (.pdf) *"
  ], []);

  // Proveedor y persona física
  const documentList4 = useMemo(() => [
    "Constancia de Situación Fiscal (.pdf) *",
    "Comprobante de domicilio (.pdf) *",
    "INE representante legal (.jpg /.png)*",
    "Catálogo de productos (.pdf)",
    "Solicitud de crédito y requisitos (.pdf)",
    "Curriculum de la empresa (.pdf)",
    "Caratula bancaria (.pdf)"
  ], []);

  const getDocumentList = useCallback(() => {
    if (tipo === 'proveedor' && persona === 'fisica') {
      return documentList4;
    } else if (tipo === 'subcontrato' && persona === 'moral') {
      return documentList3;
    } else if (tipo === 'subcontrato') {
      return documentList2;
    } else if (tipo === 'proveedor') {
      return documentList1;
    } else {
      return [];
    }
  }, [tipo, persona, documentList1, documentList2, documentList3, documentList4]);

  const [documentList, setDocumentList] = useState(getDocumentList);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(Array(getDocumentList().length).fill([]));
  const [skippedDocuments, setSkippedDocuments] = useState([]);

  const areRequiredDocumentsUploaded = useCallback(() => {
    return documentList
      .filter(doc => doc.includes('*'))
      .every((_, index) => uploadedFiles[index].length > 0);
  }, [documentList, uploadedFiles]);

  useEffect(() => {
    const newDocumentList = getDocumentList();
    setDocumentList(newDocumentList);
    setUploadedFiles(Array(newDocumentList.length).fill([]));
    setSkippedDocuments([]);
    setCurrentStep(0);
  }, [getDocumentList]);

  useEffect(() => {
    onFilesChange(uploadedFiles); // Llama a la función cuando uploadedFiles cambia
  }, [uploadedFiles, onFilesChange]);

  useEffect(() => {
    if (onDocumentsComplete) {
      onDocumentsComplete(areRequiredDocumentsUploaded());
    }
  }, [uploadedFiles, skippedDocuments, documentList, onDocumentsComplete, areRequiredDocumentsUploaded]);

  const validateFileExtension = (file, doc) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = doc.includes('.pdf') ? ['pdf'] : ['jpg', 'png'];
    return allowedExtensions.includes(extension);
  };

  const handleFileUpload = (index, newFiles) => {
    const document = documentList[index].replace(/\s*\*\s*$/, ''); // Elimina el asterisco y espacios
    const validFiles = Array.from(newFiles).filter(file => validateFileExtension(file, document));

    if (validFiles.length > 0) {
        const updatedFiles = [...uploadedFiles];
        const newUploads = validFiles.map(file => {
            const docId = documentIDs[document];
            console.log(`Document: ${document}, ID: ${docId}, Nombre del archivo: ${file.name}`); // Muestra el documento, ID y nombre
            return { id: docId, file };
        });
        updatedFiles[index] = [...updatedFiles[index], ...newUploads];
        setUploadedFiles(updatedFiles);
        advanceToNextStep(index);
    } else {
        alert('Algunos archivos no tienen la extensión requerida.');
    }
};

  const handleFileDelete = (docIndex, fileIndex) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[docIndex] = updatedFiles[docIndex].filter((_, idx) => idx !== fileIndex);
    setUploadedFiles(updatedFiles);

    if (updatedFiles[docIndex].length === 0) {
      setCurrentStep(docIndex);
    }
  };

  const handleSkip = () => {
    setSkippedDocuments([...skippedDocuments, currentStep]);
    advanceToNextStep(currentStep);
  };

  const advanceToNextStep = (currentIndex) => {
    let nextStep = currentIndex + 1;
    while (nextStep < documentList.length && (uploadedFiles[nextStep].length > 0 || skippedDocuments.includes(nextStep))) {
      nextStep++;
    }
    setCurrentStep(nextStep >= documentList.length ? documentList.length : nextStep);
  };

  const getIcon = (doc) => {
    if (doc.includes('.pdf')) {
      return <FontAwesomeIcon icon={faFilePdfRegular} className="register__icon" />;
    } else if (doc.includes('.jpg') || doc.includes('.png')) {
      return <FontAwesomeIcon icon={faImageRegular} className="register__icon" />;
    }
    return null;
  };

  return (
    <div>
      <div className="register__label-document column">
        <div>
          {documentList.map((doc, index) => (
            <div key={index} className="register__document-section">
              <div className="register__document-label">
                <p>{index + 1}. {getIcon(doc)} {doc}</p>
                {uploadedFiles[index]?.map((uploaded, fileIndex) => (
                  <div key={fileIndex} className="upload-content">
                    <a href={URL.createObjectURL(uploaded.file)} target="_blank" rel="noopener noreferrer">
                      {uploaded.file.name}
                    </a>
                    <button onClick={() => handleFileDelete(index, fileIndex)}>Eliminar</button>
                  </div>
                ))}
              </div>
              
              {index === currentStep && (
                <>
                  {!doc.includes('*') && (
                    <button className="register__button-skip" onClick={handleSkip}>Omitir</button>
                  )}
                  <Uploader
                    key={index}
                    onUpload={(newFiles) => handleFileUpload(index, newFiles)}
                    validFileTypes={documentList[index].includes('.pdf') ? ['pdf'] : ['jpg', 'png']}
                  />                  
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

RegisterUploader.propTypes = {
  onDocumentsComplete: PropTypes.func,
  onFilesChange: PropTypes.func.isRequired,
};

export default RegisterUploader;
