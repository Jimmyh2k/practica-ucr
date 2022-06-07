import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarUsuario(){

    const navigate = useNavigate();

    //Se guarda primero el usuario en el useState
    const[usuario,guardarUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena:'',
        rol: ''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            guardarUsuario({
                ...usuario,
                [e.target.name] : e.target.value
            })

    }

    //validar el formulario
    const ValidarUsuario = () => {
        //Destructuring
        const {_idUsuario, nombre, correo, contrasena,rol} = usuario;

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !contrasena.length || !rol.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un usuario nuevo
    const GuardarUsuario = e =>{
        e.preventDefault();

        clienteAxios.post('/crear-cuenta', usuario)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Se agregó el usuario',
                res.data.mensaje,
                'success'
            )
        });
        navigate('/');
    }


    return(
        <Fragment>
            <h2>Agregar Usuario</h2>

            <form onSubmit={GuardarUsuario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el nombre" 
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Correo Electronico:</label>
                    <input 
                        type="email" 
                        placeholder="Ingrese el correo" 
                        name="correo"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Contraseña: </label>
                    <input 
                        type="password" 
                        placeholder="Ingrese la contraseña" 
                        name="contrasena"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Rol: </label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el rol" 
                        name="rol"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Usuario"
                            disabled={ValidarUsuario()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default AgregarUsuario;