import React, { useState } from 'react';
import { specialties } from "../specialty/specialtiesData";
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

const SpecialtiesForm = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([
    { specialty: '', scope: [], options: [] }
  ]);

  const handleSpecialtyChange = (index, selectedOption) => {
    const specialtyTitle = selectedOption ? selectedOption.value : '';
    const updatedSpecialties = [...selectedSpecialties];
    updatedSpecialties[index].specialty = specialtyTitle;

    const selectedSpecialtyData = specialties.find(specialty => specialty.title === specialtyTitle);
    if (selectedSpecialtyData) {
      updatedSpecialties[index].options = selectedSpecialtyData.content.map(item => ({ value: item.title, label: item.title }));
    } else {
      updatedSpecialties[index].options = [];
    }
    updatedSpecialties[index].scope = []; // Clear selected scopes when specialty changes
    setSelectedSpecialties(updatedSpecialties);
  };

  const handleScopeChange = (index, selectedOptions) => {
    const updatedSpecialties = [...selectedSpecialties];
    updatedSpecialties[index].scope = selectedOptions;
    setSelectedSpecialties(updatedSpecialties);
  };

  const handleAddSpecialty = () => {
    setSelectedSpecialties([...selectedSpecialties, { specialty: '', scope: [], options: [] }]);
  };

  const handleRemoveSpecialty = (index) => {
    if (selectedSpecialties.length > 1) {
      const updatedSpecialties = [...selectedSpecialties];
      updatedSpecialties.splice(index, 1);
      setSelectedSpecialties(updatedSpecialties);
    }
  };

  const selectedSpecialtyTitles = selectedSpecialties.map(specialty => specialty.specialty);

  const specialtyOptions = specialties
    .filter(specialty => !selectedSpecialtyTitles.includes(specialty.title))
    .map(specialty => ({ value: specialty.title, label: specialty.title }));

  return (
    <div>
      {selectedSpecialties.map((selected, index) => (
        <div key={index}>
          <div className='register__input-select'>
            <Select
              className={index !== 0 ? 'register__select' : 'register__select-first'}
              value={selected.specialty ? { value: selected.specialty, label: selected.specialty } : null}
              onChange={(selectedOption) => handleSpecialtyChange(index, selectedOption)}
              options={specialtyOptions}
              placeholder="Selecciona tu especialidad"
            />
            {selectedSpecialties.length > 1 && index !== 0 && (
              <button type="button" onClick={() => handleRemoveSpecialty(index)} className="register__remove-button">
                <FaTimes className='icon__center'/>
              </button>
            )}
          </div>          
          {index === selectedSpecialties.length - 1 && (
            <div>
              <p>Para seleccionar la especialidad adecuada. Te compartimos un documento que contiene una descripción de las especialidades disponibles.  <a className="register__link" href="https://www.atisa.com/cadena_de_suministros/tabla_especialidades.pdf" target="_blank" rel="noopener noreferrer">Tabla de Especialidades</a>
              </p>
               </div>              
          )} 
          {index !== selectedSpecialties.length - 1 && (              
            <br></br>
          )}       
          <div>
            <div className="register__label">
            </div>
            <div>
              <Select
                isMulti
                value={selected.scope}
                onChange={(selectedOptions) => handleScopeChange(index, selectedOptions)}
                options={selected.options}
                placeholder="Selecciona un alcance"
                isDisabled={selected.specialty === ''}
              />
            </div>
            {index === selectedSpecialties.length - 1 && (
            <p>De acuerdo a la especialidad elegida, favor de indicar 3 (tres) principales alcances de forma general.</p>
            )}
            <br></br>
          </div>
        </div>
      ))}

      <button type="button" onClick={handleAddSpecialty} disabled={selectedSpecialties.length >= specialties.length}>
        Añadir otra especialidad
      </button>
    </div>
  );
};

export default SpecialtiesForm;
