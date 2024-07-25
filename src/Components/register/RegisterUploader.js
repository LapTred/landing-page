import React, { useState } from 'react';
import "./Register.css";
import Uploader from '../uploader/Uploader.js';

const Register = () => {
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

  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(Array(documentList.length).fill([]));

  const handleFileUpload = (index, newFiles) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index] = [...updatedFiles[index], ...newFiles];
    setUploadedFiles(updatedFiles);

    // Encontrar el siguiente paso que necesita un archivo
    const nextStep = updatedFiles.findIndex(files => files.length === 0);
    setCurrentStep(nextStep === -1 ? documentList.length : nextStep);
  };

  const handleFileDelete = (docIndex, fileIndex) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[docIndex] = updatedFiles[docIndex].filter((_, idx) => idx !== fileIndex);
    setUploadedFiles(updatedFiles);

    // Encontrar el siguiente paso que necesita un archivo
    const nextStep = updatedFiles.findIndex(files => files.length === 0);
    setCurrentStep(nextStep === -1 ? documentList.length : nextStep);
  };

  return (
    <div>
      <div className="register__label-document column">
        <p>Favor de subir y enviar los documentos enlistados a continuación en caso de aplicar según sea el giro y la especialidad de su empresa.</p>
        <br />
        <div>
          {documentList.map((doc, index) => (
            <div key={index} className="register__document-section">
              <p>{index + 1}. {doc}</p>
              {uploadedFiles[index].map((file, fileIndex) => (
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

export default Register;