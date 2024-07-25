
import { useState } from 'react';
import './Uploader.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader({ onUpload }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = ({ target: { files: newFiles } }) => {
    const updatedFiles = Array.from(newFiles);
    setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
    if (updatedFiles.length > 0) {
      onUpload(updatedFiles);
    }
  };

  const handleDelete = index => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <main>
      <form className="uploaded-form">
        <label htmlFor="fileInput" className="input-label">
          <input
            type="file"
            accept=".pdf, image/*"
            id="fileInput"
            className="input-field"
            hidden
            onChange={handleFileChange}
          />
          <MdCloudUpload color="#1475cf" size={60} />
          <p>Buscar archivos para subir (PDF o Imagen)</p>
        </label>
      </form>

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