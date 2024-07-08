
import { NavLink } from "react-router-dom";
import "./Reverse-auction.css";

const Reverse = () => {

    return (
        <div className="login">            
            <div className="login__container">
                <div className="login__text-container">
                    <p className="login__text">
                        INGRESA A NUESTRO PORTAL DE LICITACIONES CON TU USUARIO Y CONTRASEÑA PROPORCIONADO POR EL DEPARTAMENTO DE CADENA DE SUMINISTROS
                    </p>
                </div>
                <div className="login__form-container">
                    <form className="flex column login__form spaceAround">
                        <div className="inputWrapper flex">
                            <label className="inputLabel">USUARIO:</label>
                            <input type="text" className="TextInput"/>
                        </div>                        
                        
                        <div className="inputWrapper flex">
                            <label className="inputLabel">CONTRASEÑA:</label>
                            <input type="password" className="TextInput"/>
                        </div>
                        <p className="login__text-password ">
                            OLVIDÉ LA CONTRASEÑA
                        </p>
                        <button className="inputBtn fastTransition" type='submit'>Ingresar</button>
                    </form>
                    <p className="login__form">
                        SI AÚN NO ERES USUARIO,&nbsp;
                        <NavLink to="/register" className="register-link">
                        REGÍSTRATE AQUÍ
                        </NavLink>
                    </p>
                </div>
               
            </div>            
        </div>
    );
};

export default Reverse;
