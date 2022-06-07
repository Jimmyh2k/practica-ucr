import React, {Fragment, useState, useEffect} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";

function EditarUsuario(){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero el usuario en el useState
    const[usuario,datosUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        rol: ''
    });

        //Query a la api
        const consultarApi = async () => {
            const clienteConsulta = await clienteAxios.get(`/usuarios/${id}`);
            console.log(clienteConsulta.data);
            datosUsuario(clienteConsulta.data);
        }

        useEffect( () => {
            consultarApi();
        }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            datosUsuario({
                ...usuario,
                [e.target.name] : e.target.value
            })

    }

        // Envia una petición por axios para actualizar el usuario
        const actualizarUsuario = e => {
            e.preventDefault();
    
            // enviar petición por axios
            clienteAxios.put(`/usuarios/${usuario.idUsuario}`, usuario) 
                .then(res => {
                    // validar si hay errores de mongo 
                    if(res.data.code === 11000) {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'Ese usuario ya esta registrado'
                        })
                    } else {
                        Swal.fire(
                            'Correcto',
                            'Se actualizó Correctamente',
                            'success'
                        )
                    }
    
                    // redireccionar
                    navigate('/usuario');
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


    return(
        <Fragment>
            <h2>Editar Usuario</h2>

            <form onSubmit={actualizarUsuario}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el nombre" 
                        name="nombre"
                        onChange={actualizarState}
                        value= {usuario.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Correo Electronico:</label>
                    <input 
                        type="email" 
                        placeholder="Ingrese el correo" 
                        name="correo"
                        onChange={actualizarState}
                        value= {usuario.correo}
                    />
                </div>
            
                <div className="campo">
                    <label>Nueva contrasena:</label>
                    <input 
                        type="password" 
                        placeholder="Ingrese la contraseña" 
                        name="contrasena"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el rol" 
                        name="rol"
                        onChange={actualizarState}
                        value= {usuario.rol}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            disabled={ValidarUsuario()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default EditarUsuario;