import React, {useState, useContext} from "react";
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {useNavigate} from 'react-router-dom';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login() {

    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    const [ credenciales, guardarCredenciales] = useState({});
    const navigate = useNavigate();

    const iniciarSesion = async e => {
        e.preventDefault();

        //Autentica al usuario
        try{
            const respuesta = await clienteAxios.post('/iniciar-sesion',credenciales);

            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

             // colocarlo en el state
             guardarAuth({
                token, 
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )
            navigate('/');

        } catch (error){
            console.log(error);
            Swal.fire({type:'error', title:'Hubo un error',
            text: error.response.data.mensaje
        })
        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>

                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="correo"
                            placeholder="Correo Electronico"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    );
}

export default Login;