import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarReservacion(){

    const navigate = useNavigate();

    //Se guarda primero el reservacion en el useState
    const[reservacion,guardarReservaciones] = useState({
        idReservacion:0, 
        cantidadDePersonas:0, 
        checkIn: new Date(), 
        checkOut: new Date(),
        comentarios:'',
        idCliente:0,
        idHabitacion:0
    });

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            guardarReservaciones({
                ...reservacion,
                [e.target.name] : e.target.value
            })

    }

    //validar el formulario
    const ValidarReservacion = () => {
        //Destructuring
        const {idReservacion, cantidadDePersonas, checkIn, checkOut,comentarios, idCliente, idHabitacion} = reservacion;

        //Revisa que no haya campos vacíos
        let valido =  !comentarios.length;

         console.log(valido);
         
        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api una reservacion nueva
    const GuardarReservacion = e =>{
        e.preventDefault();

        clienteAxios.post('/reservacion', reservacion)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Se agregó la reservacion',
                res.data.mensaje,
                'success'
            )
        });
        navigate('/reservacion');
    }


    return(
        <Fragment>
            <h2>Agregar Reservacion</h2>

            <form onSubmit={GuardarReservacion}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Cantidad de Personas:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el nombre" 
                        name="cantidadDePersonas"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>checkIn:</label>
                    <input 
                        type="date" 
                        placeholder="Ingrese el checkIn" 
                        name="checkIn"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>checkOut:</label>
                    <input 
                        type="date" 
                        placeholder="Ingrese el checkOut" 
                        name="checkOut"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>comentarios:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese los comentarios" 
                        name="comentarios"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>idCliente:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el client" 
                        name="idCliente"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>idHabitacion:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese la habi" 
                        name="idHabitacion"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Reservacion"
                            disabled={ValidarReservacion()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default AgregarReservacion;