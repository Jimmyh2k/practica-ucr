import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function DetallesReservacion(props) {

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();



    const [reservacion, datosReservacion] = useState({
        cantidadDePersonas: '',
        checkIn: '',
        checkOut: '',
        comentarios: '',
        idCliente: 0,
        idHabitacion:0,
        cliente: {},
        habitacion:{}
    });

    //Query a la api
    const consultarApi = async () => {
        const reservacionConsulta = await clienteAxios.get(`/reservacion/${id}`);
        console.log(reservacionConsulta.data);
        datosReservacion(reservacionConsulta.data);
    }

    useEffect(() => {
        consultarApi();
    }, []);


    return (
        <Fragment>
            <h1>Detalles de la Reservación</h1>
            <div className="info-cliente">
                <p className="empresa">Nombre del Cliente :{reservacion.cliente.nombre}</p>
                <p className="empresa">Habitacion escojida:{reservacion.habitacion.numero}</p>
                <p className="nombre">Cantidad de personas: {reservacion.cantidadDePersonas}</p>
                <p className="empresa">CheckIn: {reservacion.checkIn}</p>
                <p className="empresa">CheckOut: {reservacion.checkOut}</p>
                <p className="empresa">Comentarios: {reservacion.comentarios}</p>
                
            </div>

        </Fragment>
    )
}

export default DetallesReservacion