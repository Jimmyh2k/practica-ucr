import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarCliente(){

    const navigate = useNavigate();

    //Se guarda primero el cliente en el useState
    const[cliente,guardarCliente] = useState({
        nombre: '',
        correo: '',
        numeroTelefonico: '',
        cedula:'',
        tipoCedula:''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            guardarCliente({
                ...cliente,
                [e.target.name] : e.target.value
            })

    }

    //validar el formulario
    const ValidarCliente = () => {
        //Destructuring
        const {_idCliente, nombre, correo, numeroTelefonico,cedula, tipoCedula} = cliente;

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !numeroTelefonico.length || !cedula.length
         || !tipoCedula.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un cliente nuevo
    const GuardarCliente = e =>{
        e.preventDefault();

        clienteAxios.post('/clientes', cliente)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Se agregó el cliente',
                res.data.mensaje,
                'success'
            )
        });
        navigate('/');
    }


    return(
        <Fragment>
            <h2>Agregar Cliente</h2>

            <form onSubmit={GuardarCliente}>
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
                    <label>Numero Telefonico</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el telefono" 
                        name="numeroTelefonico"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Cédula:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese la Cédula" 
                        name="cedula"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Tipo Cedula:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el tipo cédula" 
                        name="tipoCedula"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Cliente"
                            disabled={ValidarCliente()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default AgregarCliente;