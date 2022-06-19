import React, { useContext } from "react";
import { FacturaContext } from '../../context/FacturaContext';
import { Paper, Typography, Button, TextField } from '@mui/material'

const AceptarNuevaReservacion = () => {

    const { checkIn, checkOut, reservacion, dataForUI, actualizarReservacion } = useContext(FacturaContext);
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', mt: '2rem' }}>
            <Typography sx={{ mt: '2rem' }} variant="h5" component="h2">
                Ha seleccionado los siguientes datos.
            </Typography>
            <Typography variant="subtitle2" component="h2">
                Si desea comenzar de nuevo presione Reset
            </Typography>
            <Typography>Cliente: {dataForUI.datosDelCliente.nombre}</Typography>
            <Typography>Cantidad de personas: {reservacion.cantidadDePersonas}</Typography>
            <Typography>Fecha de checkIn: { } {checkIn.getDate()} - {checkIn.getMonth()} - {checkIn.getFullYear()} </Typography>
            <Typography>Fecha de checkOut: { } {checkOut.getDate()} - {checkOut.getMonth()} - {checkOut.getFullYear()} </Typography>
            <Typography>Número de habitación: {dataForUI.datosDeHabitacion.numero}</Typography>
            <TextField
                id="comentarios"
                name="comentarios"
                label="Comentarios"
                multiline
                rows={4}
                variant="outlined"
                value={reservacion.comentarios}
                onChange={e => (actualizarReservacion({ name: e.target.name, value: e.target.value }))}

            />
            <Button sx={{ mb: '2rem' }} variant="outlined">Crear reservacion</Button>
        </Paper>
    )
}
export default AceptarNuevaReservacion;