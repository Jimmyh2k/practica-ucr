import React from "react";
import Calendar from 'react-calendar';
import { useState, useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Paper, TextField } from '@mui/material';
import { FacturaContext } from '../../context/FacturaContext';
import DatePicker from 'react-date-picker';



function SeleccionarFechas() {

    const [fechasCorrectas, setFechasCorrectas] = useState(true);
    const { cantidadDePersonas, setCantidadDePersonas, checkIn, setCheckIn, checkOut, setCheckOut, actualizarReservacion } = useContext(FacturaContext);
    return (
        <Paper sx={{
            display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', height: '100%'
        }}>
            <TextField
                margin="normal"
                required
                name="cantidadDePersonas"
                label="Cantidad de personas"
                type="text"
                id="cantidadDePersonas"
                onChange={e => actualizarReservacion({ name: e.target.name, value: e.target.value })}
            />

            <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Box sx={{}}>
                    <Typography variant="h5" component="h2">Seleccione el Check In</Typography>
                    <Calendar onChange={setCheckIn} value={checkIn} />
                </Box>
                <Box sx={{}}>
                    <Typography variant="h5" component="h2">Seleccione el Check Out</Typography>
                    <Calendar onChange={setCheckOut} value={checkOut} />
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: { xs: 'column' }, alignItems: 'center', justifyContent: 'center', gap: '4rem', pt: { md: '4rem' } }}>
                <Box sx={{}}>
                    <Typography variant="h5" component="h2">Seleccione el Check In</Typography>
                    <DatePicker onChange={setCheckIn} value={checkIn} />
                </Box>
                <Box sx={{}}>
                    <Typography variant="h5" component="h2">Seleccione el Check Out</Typography>
                    <DatePicker onChange={setCheckOut} value={checkOut} />
                </Box>
            </Box>
        </Paper >
    )
}
export default SeleccionarFechas;