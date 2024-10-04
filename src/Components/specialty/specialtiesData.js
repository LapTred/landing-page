// specialtiesData.js

import axios from 'axios';

// Función para obtener las especialidades desde el endpoint
const fetchSpecialties = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_GET_COMPRAS_SPECIALITIES}`);
        if (res.status === 200) {    
            return res.data;
        }
    } catch (error) {
        console.error("Error fetching specialties:", error);
        return null;
    }
};

// Función para obtener el alcance basado en una especialidad
const fetchScope = async (id_especialidad) => {
    const body = {
        'especialidad': id_especialidad,
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_GET_COMPRAS_SCOPE}`, body);
        if (res.status === 200) {    
            return res.data;
        }
    } catch (error) {
        console.error("Error fetching scope:", error);
        return null;
    }
};

// Función principal que combina especialidades y alcances
const specialties = async () => {
    const specialtiesData = await fetchSpecialties();
    if (!specialtiesData) return null;

    const result = [];

    // Asumimos que specialtiesData es una lista de especialidades
    for (const specialty of specialtiesData) {
        const scopeData = await fetchScope(specialty.id);

        // Formatear la respuesta en el formato deseado
        const formattedSpecialty = {
            id: specialty.id,
            title: specialty.nombre,
            content: scopeData.map(item => ({
                id: item.id,
                title: item.nombre,
                description: item.descripcion,
            })),
        };

        result.push(formattedSpecialty);
    }

    return result;
};

export default specialties;
