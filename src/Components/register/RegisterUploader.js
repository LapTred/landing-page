import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./Register.css";
import Uploader from '../uploader/Uploader.js';

const RegisterUploader = ({ tipo }) => {
  const documentList2 = [
    "Curriculum de la empresa (pdf)",
    "Acta Constitutiva (aplica solamente cuando es persona moral) (pdf)",
    "Poder Legal (aplica solamente cuando es persona moral) (pdf)",
    "INE representante legal (.jpg /. png)",
    "REPSE (pdf)",
    "Tarjeta Patronal (.jpg / .png)",
    "Última liquidación IMSS (pdf)",
    "Opinión de cumplimiento IMSS, SA (pdf)"
  ];

  const documentList1 = [
    "Catálogo de productos (pdf)",
    "Solicitud de crédito y requisitos (pdf)",
    "Constancia de Situación Fiscal (pdf)"
  ];

  const [documentList, setDocumentList] = useState(documentList1);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (tipo === 'proveedor') {
      setDocumentList(documentList1);
    } else if (tipo === 'subcontrato') {
      setDocumentList(documentList2);
    }
    setUploadedFiles(Array(documentList.length).fill([]));
  }, [tipo]);

  const handleFileUpload = (index, newFiles) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = [...updatedFiles[index], ...newFiles];
    setUploadedFiles(updatedFiles);

    const nextStep = updatedFiles.findIndex(files => files.length === 0);
    setCurrentStep(nextStep === -1 ? documentList.length : nextStep);
  };

  const handleFileDelete = (docIndex, fileIndex) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[docIndex] = updatedFiles[docIndex].filter((_, idx) => idx !== fileIndex);
    setUploadedFiles(updatedFiles);

    const nextStep = updatedFiles.findIndex(files => files.length === 0);
    setCurrentStep(nextStep === -1 ? documentList.length : nextStep);
  };

  return (
    <div>
      <div className="register__label-document column">
        <div>
          {documentList.map((doc, index) => (
            <div key={index} className="register__document-section">
              <p>{index + 1}. {doc}</p>
              {uploadedFiles[index]?.map((file, fileIndex) => (
                <div key={fileIndex} className="upload-content">
                  <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                  <button onClick={() => handleFileDelete(index, fileIndex)}>Eliminar</button>
                </div>
              ))}
              {index === currentStep && (
                <Uploader key={index} onUpload={(newFiles) => handleFileUpload(index, newFiles)} />
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
};

export default RegisterUploader;
