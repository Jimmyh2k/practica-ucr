import React from "react";
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Paper } from '@mui/material';


function SeleccionarFechas() {
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [fechasCorrectas, setFechasCorrectas] = useState(true);
    return (
        <Paper sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', width: '100%', height: { xs: '100%', md: '30rem' } }, justifyContent: 'center' }}>
            <Box sx={{ pr: { md: 1 } }}>
                <h2>Seleccionar Check In</h2>
                <Calendar onChange={setCheckIn} value={checkIn} />
            </Box>
            <Box sx={{ pl: { md: 1 } }}>
                <h2>Seleccionar Check Out</h2>
                <Calendar onChange={setCheckOut} value={checkOut} />
            </Box>
        </Paper>
    )
}
export default SeleccionarFechas;