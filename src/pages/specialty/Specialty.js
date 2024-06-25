import React, { useState } from "react";
import background from "../../assets/Specialty/Imagen-de-fondo2.jpg";
import "./Specialty.css";
import Asset17 from "../../assets/Specialty/Asset17.png";
import Asset18 from "../../assets/Specialty/Asset18.png";

// Importar los datos de especialidades desde specialtiesData.js
import { specialties } from "./specialtiesData";

const Specialty = () => {
    const [visibleInfo, setVisibleInfo] = useState(null);

    const toggleInfo = (id) => {
        setVisibleInfo(visibleInfo === id ? null : id);
    };

    return (
        <div className="specialty">
            <div className="specialty__background-container">
                <img src={background} alt="Background" className="specialty__background"/>
                <div className="specialty__overlay">
                    <div className="specialty__text-container">
                        <h1>VALORAMOS TU EXPERIENCIA</h1>
                    </div>
                </div>
            </div>
            <div className="specialty__works-container"></div>
            <div className="specialty__client-container">
                <div className="specialty__client-overlay">
                    <div className="specialty__text-client">
                        <p className="specialty__client-h1">
                            EN NUESTRO CONSTANTE COMPROMISO POR OFRECERTE LAS MEJORES OPORTUNIDADES DE NEGOCIO, TE PRESENTAMOS UNA LISTA DE NUESTRAS ESPECIALIDADES.
                            <br />
                            AQUÍ PODRÁS REVISAR SI ALGUNA SE ADAPTA A LOS SERVICIOS QUE TU EMPRESA OFRECE, ALINEÁNDOSE CON SUS CAPACIDADES Y EXPERIENCIA.
                        </p>
                    </div>
                </div>
            </div>
            <div className="specialty__tables">
                {specialties.map((table) => (
                    <div key={table.id}>
                        <div className="specialty__table-title" onClick={() => toggleInfo(table.id)}>
                            <img src={visibleInfo === table.id ? Asset17 : Asset18} alt="Icon" className="specialty__icon" />
                            <h1>{table.title}</h1>
                        </div>
                        {visibleInfo === table.id && (
                            <div className="table-container">
                                <table className="specialty__table">                                    
                                    <tbody>
                                        {table.content && table.content.map((item, index) => (
                                            <tr key={item.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                                <td style={{width: "30%", fontWeight:700}}>{item.title}</td>
                                                <td style={{width: "70%"}}>{item.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Specialty;
