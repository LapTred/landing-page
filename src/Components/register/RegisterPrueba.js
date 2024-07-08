import React, { useState } from 'react';
import { specialties } from "../specialty/specialtiesData";

const SpecialtiesForm = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedScope, setSelectedScope] = useState([]);

  const handleSpecialtyChange = (event) => {
    const specialtyTitle = event.target.value;
    setSelectedSpecialty(specialtyTitle);

    // Buscar el alcance correspondiente a la especialidad seleccionada
    const selectedSpecialtyData = specialties.find(specialty => specialty.title === specialtyTitle);
    if (selectedSpecialtyData) {
      setSelectedScope(selectedSpecialtyData.content);
    } else {
      setSelectedScope([]);
    }
  };

  return (
    <div>
      <div className="register__label">
        <p>Especialidad *</p>
      </div>
      <div className="register__input column">
        <select className="register__textInput" value={selectedSpecialty} onChange={handleSpecialtyChange}>
          <option value="" disabled>
            Selecciona tu especialidad
          </option>
          {specialties.map(specialty => (
            <option key={specialty.id} value={specialty.title}>
              {specialty.title}
            </option>
          ))}
        </select>
      </div>

      {selectedSpecialty && (
        <div>
          <div className="register__label">
            <p>Alcance *</p>
          </div>
          <div className="register__input column">
            <select className="register__textInput" value={selectedScope.title} readOnly>
              {selectedScope.length === 0 ? (
                <option value="">Selecciona un alcance</option>
              ) : (
                selectedScope.map(item => (
                  <optgroup key={item.id} label={item.title}>
                    <option value={item.description}>{item.description}</option>
                  </optgroup>
                ))
              )}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialtiesForm;
