import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarHabitacion(){

    const navigate = useNavigate();

    //Se guarda primero la habitacion en el useState
    const[habitacion,guardarHabitacion] = useState({
        numero: '',
        camasIndividuales: '',
        camasDobles: '',
        recomendacionPrecioNacional:'',
        recomendacionPrecioExtranjero:''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            guardarHabitacion({
                ...habitacion,
                [e.target.name] : e.target.value
            })

    }

    //validar el formulario
    const ValidarHabitacion = () => {
        //Destructuring
        const {numero, camasIndividuales, camasDobles,recomendacionPrecioNacional, recomendacionPrecioExtranjero} = habitacion;

        //Revisa que no haya campos vacíos
        let valido = !numero.length || !camasIndividuales.length || !camasDobles.length || !recomendacionPrecioNacional.length
         || !recomendacionPrecioExtranjero.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api una habitacion nueva
    const GuardarHabitacion = e =>{
        e.preventDefault();

        clienteAxios.post('/habitacion', habitacion)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Se agregó la habitacion',
                res.data.mensaje,
                'success'
            )
        });
        navigate('/habitacion');
    }


    return(
        <Fragment>
            <h2>Agregar Habitacion</h2>

            <form onSubmit={GuardarHabitacion}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Numero de Hab.:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el nombre" 
                        name="numero"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Camas Individuales:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el correo" 
                        name="camasIndividuales"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Camas dobles</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el telefono" 
                        name="camasDobles"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Precio Nacionales:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el precio para nacionales" 
                        name="recomendacionPrecioNacional"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Precio Extranjeros</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el precio para extranjeros" 
                        name="recomendacionPrecioExtranjero"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Habitacion"
                            disabled={ValidarHabitacion()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default AgregarHabitacion;