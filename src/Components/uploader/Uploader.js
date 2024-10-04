import { useState } from 'react';
import './Uploader.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader({ onUpload, validFileTypes }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = ({ target: { files: newFiles } }) => {
    const updatedFiles = Array.from(newFiles);
    const validFiles = updatedFiles.filter(file => validateFile(file));

    if (validFiles.length > 0) {
      // Si hay archivos válidos, actualiza el estado y envía los archivos válidos a `onUpload`
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      onUpload(validFiles);
      setError('');
    }

    if (updatedFiles.length !== validFiles.length) {
      // Si hay archivos no válidos, muestra un mensaje de error
      setError('Archivo no válido');
    }
  };

  const handleDelete = index => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    return validFileTypes.includes(extension);
  };

  return (
    <main className='flex centerItems centerContent'>
      {error && <p className="error-message">{error}</p>}

      {/* Reemplaza el form por un div */}
      <div className="uploaded-form">
        <label htmlFor="fileInput" className="input-label">
          <input
            type="file"
            accept={validFileTypes.map(ext => `.${ext}`).join(', ')}
            id="fileInput"
            className="input-field"
            hidden
            onChange={handleFileChange}
          />
          <p>Subir</p>
        </label>
      </div>

      {files.length > 0 && (
        <section className="uploaded-row">
          {files.map((file, index) => (
            <div key={index} className="upload-content">
              {file.type.startsWith('image') ? (
                <AiFillFileImage color="#1475cf" />
              ) : (
                <MdCloudUpload color="#1475cf" />
              )}
              <span>{file.name}</span>
              <MdDelete onClick={() => handleDelete(index)} />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default Uploader;
