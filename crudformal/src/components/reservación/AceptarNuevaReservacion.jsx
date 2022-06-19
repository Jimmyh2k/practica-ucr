import React, { useContext } from "react";
import { FacturaContext } from '../../context/FacturaContext';
import { Paper, Typography, Button } from '@mui/material'

const AceptarNuevaReservacion = () => {

    const { cantidadDePersonas, checkIn, checkOut, clienteReservacion, habitacionReservacion, seleccionDeCliente, seleccionDeHabitacion, dataForUI } = useContext(FacturaContext);
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', mt: '2rem' }}>
            <Typography sx={{ mt: '2rem' }} variant="h6" component="h2">
                Ha seleccionado los siguientes datos.
            </Typography>
            <Typography variant="subtitle2" component="h2">
                Si desea crear una nueva reservación presione Aceptar.
            </Typography>
            <Typography>Cliente: {dataForUI.datosDelCliente.nombre}</Typography>
            <Typography>Cantidad de personas: {cantidadDePersonas}</Typography>
            <Typography>Fecha de checkIn: { } {checkIn.getDate()} - {checkIn.getMonth()} - {checkIn.getFullYear()} </Typography>
            <Typography>Fecha de checkOut: { } {checkOut.getDate()} - {checkOut.getMonth()} - {checkOut.getFullYear()} </Typography>
            <Typography>Número de habitación: {dataForUI.datosDeHabitacion.numero}</Typography>
            <Button sx={{ mb: '2rem' }} variant="outlined">Crear reservacion</Button>
        </Paper>
    )
}
export default AceptarNuevaReservacion;