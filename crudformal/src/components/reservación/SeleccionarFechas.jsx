import React from "react";
import Calendar from 'react-calendar';
import { useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Paper, TextField } from '@mui/material';
import { DataContext } from '../../context/DataContext';
import DatePicker from 'react-date-picker';



function SeleccionarFechas() {

    const { checkIn, setCheckIn, checkOut, setCheckOut, reservacion, actualizarReservacion } = useContext(DataContext);
    return (
        <Paper sx={{
            display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center', height: '100%'
        }}>
            <TextField
                sx={{ mt: '4rem' }}
                margin="normal"
                required
                name="cantidadDePersonas"
                label="Cantidad de personas"
                type="number"
                id="cantidadDePersonas"
                InputProps={{ inputProps: { min: 0 } }}
                value={reservacion.cantidadDePersonas}
                onChange={e => actualizarReservacion({ name: e.target.name, value: e.target.value })}
            />

            <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Box sx={{}}>
                    <Typography variant="h6" component="h2">Seleccione el Check In</Typography>
                    <Calendar onChange={setCheckIn} value={checkIn} />
                </Box>
                <Box sx={{}}>
                    <Typography variant="h6" component="h2">Seleccione el Check Out</Typography>
                    <Calendar onChange={setCheckOut} value={checkOut} />
                </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', lg: 'none' }, flexDirection: { xs: 'column' }, alignItems: 'center', justifyContent: 'center', gap: '4rem', pt: { md: '4rem' } }}>
                <Box sx={{}}>
                    <Typography variant="h6" component="h2">Check In</Typography>
                    <DatePicker onChange={setCheckIn} value={checkIn} />
                </Box>
                <Box sx={{}}>
                    <Typography variant="h6" component="h2">Check Out</Typography>
                    <DatePicker onChange={setCheckOut} value={checkOut} />
                </Box>
            </Box>
        </Paper >
    )
}
export default SeleccionarFechas;