import React, { useEffect } from 'react'; 
import specialties from "../specialty/specialtiesData"; 
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

const RegisterSpecialities = ({ selectedSpecialties, setSelectedSpecialties }) => {
  const [allSpecialties, setAllSpecialties] = React.useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      const specialtiesData = await specialties(); 
      setAllSpecialties(specialtiesData);
    };

    fetchSpecialties();
  }, []);

  const handleSpecialtyChange = async (index, selectedOption) => {
    const specialtyTitle = selectedOption ? selectedOption.value : '';
    const updatedSpecialties = [...selectedSpecialties];
    updatedSpecialties[index].specialty = specialtyTitle;

    // Encuentra la especialidad seleccionada y guarda su ID
    const selectedSpecialtyData = allSpecialties.find(specialty => specialty.title === specialtyTitle);
    if (selectedSpecialtyData) {
      updatedSpecialties[index].id = selectedSpecialtyData.id; // Guarda el ID
      updatedSpecialties[index].options = selectedSpecialtyData.content.map(item => ({
        value: item.title,
        label: item.title,
        id: item.id // Asegúrate de incluir el ID aquí
      }));
    } else {
      updatedSpecialties[index].options = [];
    }
    updatedSpecialties[index].scope = []; 
    setSelectedSpecialties(updatedSpecialties);
  };

  const handleScopeChange = (index, selectedOptions) => {
    const updatedSpecialties = [...selectedSpecialties];
    updatedSpecialties[index].scope = selectedOptions ? selectedOptions.map(option => ({
      title: option.value,
      id: option.id, // Guarda el ID de cada alcance desde las opciones
    })) : [];    
    setSelectedSpecialties(updatedSpecialties);
  };

  const handleAddSpecialty = () => {
    setSelectedSpecialties([...selectedSpecialties, { specialty: '', id: null, scope: [], options: [] }]);
  };

  const handleRemoveSpecialty = (index) => {
    if (selectedSpecialties.length > 1) {
      const updatedSpecialties = [...selectedSpecialties];
      updatedSpecialties.splice(index, 1);
      setSelectedSpecialties(updatedSpecialties);
    }
  };

  const selectedSpecialtyTitles = selectedSpecialties.map(specialty => specialty.specialty);

  const specialtyOptions = () => {
    return allSpecialties
      .filter(specialty => !selectedSpecialtyTitles.includes(specialty.title))
      .map(specialty => ({ value: specialty.title, label: specialty.title }));
  };

  return (
    <div>
      {selectedSpecialties.map((selected, index) => (
        <div key={index}>
          <div className='register__input-select'>
            <Select
              className={index !== 0 ? 'register__select' : 'register__select-first'}
              value={selected.specialty ? { value: selected.specialty, label: selected.specialty } : null}
              onChange={(selectedOption) => handleSpecialtyChange(index, selectedOption)}
              options={specialtyOptions()} 
              placeholder="Selecciona tu especialidad"
            />
            {selectedSpecialties.length > 1 && index !== 0 && (
              <button type="button" onClick={() => handleRemoveSpecialty(index)} className="register__remove-button">
                <FaTimes className='icon__center'/>
              </button>
            )}
          </div>          
          {index === selectedSpecialties.length - 1 && (
            <div className='marginBottom10'>
              <p>Para seleccionar la especialidad adecuada. Te compartimos un documento que contiene una descripción de las especialidades disponibles. <a className="register__link" href="https://www.atisa.com/cadena_de_suministros/tabla_especialidades.pdf" target="_blank" rel="noopener noreferrer">Tabla de Especialidades</a>
              </p>
            </div>              
          )} 
          {index !== selectedSpecialties.length - 1 && (              
            <br />
          )}       
          <div>
            <div className="register__label">
            </div>
            <div>
              <Select
                isMulti
                value={selected.scope.map(scope => ({ value: scope.title, label: scope.title, id: scope.id }))} // Mapea para mostrar título y ID
                onChange={(selectedOptions) => handleScopeChange(index, selectedOptions)}
                options={selected.options}
                placeholder="Selecciona un alcance"
                isDisabled={selected.specialty === ''}
              />
            </div>
            {index === selectedSpecialties.length - 1 && (
              <p className='marginBottom10'>De acuerdo a la especialidad elegida, favor de indicar 3 (tres) principales alcances de forma general.</p>
            )}
            {index !== selectedSpecialties.length - 1 && (
              <br />
            )}
          </div>
        </div>
      ))}
      <button className="register__button-specialities" type="button" onClick={handleAddSpecialty} disabled={selectedSpecialties.length >= allSpecialties.length}>
        Añadir otra especialidad
      </button>
    </div>
  );
};

export default RegisterSpecialities;
