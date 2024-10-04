import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const useTokenContext = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const tokenString = localStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    });

    const saveToken = (userTokenArray) => {
        try {
            if (userTokenArray && userTokenArray.length > 0) {
                const userToken = userTokenArray[0];
                const tokenData = {
                    id: userToken.id,
                    email: userToken.email,
                    nombre: userToken.nombre,
                    apellido: userToken.apellido,
                    telefono: userToken.telefono,
                    cgeneral: userToken.cgeneral,
                    subcontratista: userToken.subcontratista,
                    tipoCont: userToken.tipoCont,
                    documentado: userToken.documentado
                };
                localStorage.setItem('token', JSON.stringify(tokenData));
                setToken(tokenData);
                
                console.log(tokenData);
            } else {
                console.warn('No token found in userTokenArray');
            }
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const clearToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <TokenContext.Provider value={{ token, setToken: saveToken, clearToken }}>
            {children}
        </TokenContext.Provider>
    );
};
