import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./Register.css";
import Uploader from '../uploader/Uploader.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf as faFilePdfRegular, faImage as faImageRegular } from '@fortawesome/free-regular-svg-icons';

const RegisterUploader = ({ tipo, persona }) => {
  const documentList1 = useMemo(() => [
    "Constancia de Situación Fiscal (.pdf) *",
    "Comprobante de domicilio (.pdf) *",
    "Catálogo de productos (.pdf) - Opcional",
    "Solicitud de crédito y requisitos (.pdf)",
    "Curriculum de la empresa (.pdf)",
    "Caratula bancaria (.pdf)"
  ], []);

  const documentList2 = useMemo(() => [
    "Curriculum de la empresa (.pdf) *",
    "INE representante legal (.jpg /. png) *",
    "REPSE (.pdf) *",
    "Tarjeta Patronal (.jpg / .png) *",
    "Última liquidación IMSS (.pdf) *",
    "Opinión de cumplimiento IMSS, SA (.pdf) *"
  ], []);

  const documentList3 = useMemo(() => [
    "Curriculum de la empresa (.pdf) *",
    "Acta Constitutiva (.pdf) *",
    "Poder Legal (.pdf) *",
    "INE representante legal (.jpg /. png) *",
    "REPSE (.pdf) *",
    "Tarjeta Patronal (.jpg / .png) *",
    "Última liquidación IMSS (.pdf) *",
    "Opinión de cumplimiento IMSS, SA (.pdf) *"
  ], []);

  const documentList4 = useMemo(() => [
    "Constancia de Situación Fiscal (.pdf) *",
    "Comprobante de domicilio (.pdf) *",
    "INE (.jpg / .png) *",
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
  const [skippedDocuments, setSkippedDocuments] = useState([]); // Estado para documentos omitidos

  useEffect(() => {
    const newDocumentList = getDocumentList();
    setDocumentList(newDocumentList);
    setUploadedFiles(Array(newDocumentList.length).fill([]));
    setSkippedDocuments([]); // Reiniciar documentos omitidos cuando cambia el documento
    setCurrentStep(0); // Reiniciar al primer paso
  }, [getDocumentList]);

  const handleFileUpload = (index, newFiles) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = [...updatedFiles[index], ...newFiles];
    setUploadedFiles(updatedFiles);

    advanceToNextStep(index);
  };

  const handleFileDelete = (docIndex, fileIndex) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[docIndex] = updatedFiles[docIndex].filter((_, idx) => idx !== fileIndex);
    setUploadedFiles(updatedFiles);

    // Volver a mostrar el botón de subir para documentos opcionales y obligatorios
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
                {uploadedFiles[index]?.map((file, fileIndex) => (
                  <div key={fileIndex} className="upload-content">
                    <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                      {file.name}
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
                  <Uploader key={index} onUpload={(newFiles) => handleFileUpload(index, newFiles)} />
                  
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
  tipo: PropTypes.string.isRequired,
  persona: PropTypes.string.isRequired
};

export default RegisterUploader;
