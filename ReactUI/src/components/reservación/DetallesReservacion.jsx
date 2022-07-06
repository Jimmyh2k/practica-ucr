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
        idHabitacion: 0,
        cliente: {},
        habitacion: {}
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
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '93vh'
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'left',
                        backgroundColor: '#ffffff',
                        padding: '30px',
                        margin: { xs: '10px' },
                        borderRadius: '10px',
                        width: { xs: '90%', md: '70%', lg: '50%' },
                    }}
                >
                    <Typography variant="h4" component="h1">Detalles del Reservación</Typography>
                    <form >


                        <p >Nombre del Cliente :{reservacion.cliente.nombre}</p>
                        <p >Habitacion escojida:{reservacion.habitacion.numero}</p>
                        <p >Cantidad de personas: {reservacion.cantidadDePersonas}</p>
                        <p>CheckIn: {reservacion.checkIn}</p>
                        <p >CheckOut: {reservacion.checkOut}</p>
                        <p >Comentarios: {reservacion.comentarios}</p>


                    </form>
                </Box>
            </Box>

        </Fragment>

    )
}

export default DetallesReservacion