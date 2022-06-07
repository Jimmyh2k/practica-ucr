import React, {Fragment, useState, useEffect} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";

function EditarHabitacion(props){

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero la hab en el useState
    const[habitacion,datosHabitacion] = useState({
        numero: 0,
        camasIndividuales: 0,
        camasDobles: 0,
        recomendacionPrecioNacional: 0,
        recomendacionPrecioExtranjero: 0
    });

        //Query a la api
        const consultarApi = async () => {
            const habitacionConsulta = await clienteAxios.get(`/habitacion/${id}`);
            datosHabitacion(habitacionConsulta.data);
        }

        useEffect( () => {
            consultarApi();
        }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            datosHabitacion({
                ...habitacion,
                [e.target.name] : e.target.value
            })

    }

        // Envia una petición por axios para actualizar el la habitacion
        const actualizarHabitacion = e => {
            e.preventDefault();
    
            // enviar petición por axios
            clienteAxios.put(`/habitacion/${habitacion.idHabitacion}`, habitacion) 
                .then(res => {
                    // validar si hay errores de mongo 
                    if(res.data.code === 11000) {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'Esta habitacion ya esta registrado'
                        })
                    } else {
                        Swal.fire(
                            'Correcto',
                            'Se actualizó Correctamente',
                            'success'
                        )
                    }
    
                    // redireccionar
                    navigate('/habitacion');
                })
        }

    //validar el formulario
    const ValidarHabitacion = () => {
        //Destructuring
        const {numero, camasIndividuales, camasDobles,recomendacionPrecioNacional, recomendacionPrecioExtranjero} = habitacion;

        //Revisa que no haya campos vacíos
        let valido = !numero.toString().length || !camasIndividuales.toString().length ||
        !camasDobles.toString().length || !recomendacionPrecioNacional.toString().length
         || !recomendacionPrecioExtranjero.toString().length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }


    return(
        <Fragment>
            <h2>Editar Habitacion</h2>

            <form onSubmit={actualizarHabitacion}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Numero de Hab.:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el nombre" 
                        name="numero"
                        onChange={actualizarState}
                        value= {habitacion.numero}
                    />
                </div>

                <div className="campo">
                    <label>Camas Individuales:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el correo" 
                        name="camasIndividuales"
                        onChange={actualizarState}
                        value= {habitacion.camasIndividuales}
                    />
                </div>
            
                <div className="campo">
                    <label>Camas dobles</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el telefono" 
                        name="camasDobles"
                        onChange={actualizarState}
                        value= {habitacion.camasDobles}
                    />
                </div>

                <div className="campo">
                    <label>Precio Nacionales:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el precio para nacionales" 
                        name="recomendacionPrecioNacional"
                        onChange={actualizarState}
                        value= {habitacion.recomendacionPrecioNacional}
                    />
                </div>

                <div className="campo">
                    <label>Precio Extranjeros</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el precio para extranjeros" 
                        name="recomendacionPrecioExtranjero"
                        onChange={actualizarState}
                        value= {habitacion.recomendacionPrecioExtranjero}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Guardar Cambios"
                            disabled={ValidarHabitacion()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default EditarHabitacion;