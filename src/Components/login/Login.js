import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios';
import md5 from 'md5';
import React, { useState } from 'react';
import { useTokenContext } from '../../context/TokenContext'; // Importa el contexto

async function loginEmail(credential) {
    const hash = md5(credential.pass);
    const body = {
        'email': credential.email,
        'pass': hash
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_GET_COMPRAS_USERS}`, body);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error("Error durante la autenticación:", error);
        return null;
    }
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [error, setError] = useState(false);

    const { setToken } = useTokenContext(); // Usa el contexto para setear el token
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginEmail({ email, pass });
        if (token && Object.keys(token).length > 0) {
            setError(false);
            setToken(token); // Usa el contexto para setear el token
            navigate("/about");
        } else {
            setError(true);
            console.error("Token inválido o vacío:", token);
        }
    };

    return (
        <div className="login">            
            <div className="login__container">
                <div className="login__text-container">
                    <p className="login__text">INGRESA A NUESTRO PORTAL DE LICITACIONES CON TU USUARIO Y CONTRASEÑA PROPORCIONADO POR EL DEPARTAMENTO DE CADENA DE SUMINISTROS</p>
                    {error && <div className="errorMsg fadeIn"><p>Credenciales incorrectas</p></div>}
                </div>
                <div className="login__form-container">
                    <form className="flex column login__form spaceAround" onSubmit={handleSubmit}>
                        <div className="inputWrapper flex">
                            <label className="inputLabel">CORREO ELECTRÓNICO:</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="text"
                                className="TextInput"
                            />
                        </div>                        
                        <div className="inputWrapper flex">
                            <label className="inputLabel">CONTRASEÑA:</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={pass}
                                type="password"
                                className="TextInput"
                            />
                        </div>
                        <p className="login__text-password ">OLVIDÉ LA CONTRASEÑA</p>
                        <button className="inputBtn fastTransition" type='submit'>Ingresar</button>
                    </form>
                    <p className="login__form">SI AÚN NO ERES USUARIO,&nbsp;
                        <NavLink to="/register" className="register-link">REGÍSTRATE AQUÍ</NavLink>
                    </p>
                </div>
            </div>            
        </div>
    );
};

export default Login;
