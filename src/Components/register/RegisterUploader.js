import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import "./Register.css";
import Uploader from '../uploader/Uploader.js';

const RegisterUploader = ({ tipo, persona }) => {
  const documentList1 = useMemo(() => [
    "Catálogo de productos (pdf)",
    "Solicitud de crédito y requisitos (pdf)",
    "Constancia de Situación Fiscal (pdf)"
  ], []);

  const documentList2 = useMemo(() => [
    "Curriculum de la empresa (pdf)",
    "INE representante legal (.jpg /. png)",
    "REPSE (pdf)",
    "Tarjeta Patronal (.jpg / .png)",
    "Última liquidación IMSS (pdf)",
    "Opinión de cumplimiento IMSS, SA (pdf)"
  ], []);

  const documentList3 = useMemo(() => [
    "Curriculum de la empresa (pdf)",
    "Acta Constitutiva (pdf)",
    "Poder Legal (pdf)",
    "INE representante legal (.jpg /. png)",
    "REPSE (pdf)",
    "Tarjeta Patronal (.jpg / .png)",
    "Última liquidación IMSS (pdf)",
    "Opinión de cumplimiento IMSS, SA (pdf)"
  ], []);

  const getDocumentList = useCallback(() => {
    if (tipo === 'proveedor') {
      return documentList1;
    } else if (tipo === 'subcontrato' && persona === 'moral') {
      return documentList3;
    } else if (tipo === 'subcontrato') {
      return documentList2;
    } else {
      return [];
    }
  }, [tipo, persona, documentList1, documentList2, documentList3]);

  const [documentList, setDocumentList] = useState(getDocumentList);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState(Array(getDocumentList().length).fill([]));

  useEffect(() => {
    const newDocumentList = getDocumentList();
    setDocumentList(newDocumentList);
    setUploadedFiles(Array(newDocumentList.length).fill([]));
  }, [getDocumentList]);

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
  persona: PropTypes.string.isRequired // Si puede ser opcional
};

export default RegisterUploader;
