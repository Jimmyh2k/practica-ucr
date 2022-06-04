import React, {Fragment, useState, useEffect} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";

function EditarCliente(props){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero el cliente en el useState
    const[cliente,datosCliente] = useState({
        nombre: '',
        correo: '',
        numeroTelefonico: '',
        cedula:'',
        tipoCedula:''
    });

        //Query a la api
        const consultarApi = async () => {
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
            datosCliente(clienteConsulta.data);
        }

        useEffect( () => {
            consultarApi();
        }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            datosCliente({
                ...cliente,
                [e.target.name] : e.target.value
            })

    }

        // Envia una petición por axios para actualizar el cliente
        const actualizarCliente = e => {
            e.preventDefault();
    
            // enviar petición por axios
            clienteAxios.put(`/clientes/${cliente.idCliente}`, cliente) 
                .then(res => {
                    // validar si hay errores de mongo 
                    if(res.data.code === 11000) {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'Ese cliente ya esta registrado'
                        })
                    } else {
                        Swal.fire(
                            'Correcto',
                            'Se actualizó Correctamente',
                            'success'
                        )
                    }
    
                    // redireccionar
                    navigate('/');
                })
        }

    //validar el formulario
    const ValidarCliente = () => {
        //Destructuring
        const {_idCliente, nombre, correo, numeroTelefonico,cedula, tipoCedula} = cliente;
        console.log(cliente.numeroTelefonico);
        console.log(numeroTelefonico);
        console.log("--------");

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !cedula.length
         || !tipoCedula.length;
         console.log(valido);
         console.log(nombre.length);
         console.log(correo.length);
         console.log(numeroTelefonico.length);
         console.log(cedula.length);
         console.log(tipoCedula.length);

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }


    return(
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el nombre" 
                        name="nombre"
                        onChange={actualizarState}
                        value= {cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Correo Electronico:</label>
                    <input 
                        type="email" 
                        placeholder="Ingrese el correo" 
                        name="correo"
                        onChange={actualizarState}
                        value= {cliente.correo}
                    />
                </div>
            
                <div className="campo">
                    <label>Numero Telefonico</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el telefono" 
                        name="numeroTelefonico"
                        onChange={actualizarState}
                        value= {cliente.numeroTelefonico}
                    />
                </div>

                <div className="campo">
                    <label>Cédula:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese la Cédula" 
                        name="cedula"
                        onChange={actualizarState}
                        value= {cliente.cedula}
                    />
                </div>

                <div className="campo">
                    <label>Tipo Cedula:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el tipo cédula" 
                        name="tipoCedula"
                        onChange={actualizarState}
                        value= {cliente.tipoCedula}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            disabled={ValidarCliente()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default EditarCliente;