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
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center',
        }}>
            <Box sx={{}}>
                <Typography variant="h5" component="h2">Seleccione el Check In</Typography>
                <Calendar onChange={setCheckIn} value={checkIn} />
            </Box>
            <Box sx={{}}>
                <Typography variant="h5" component="h2">Seleccione el Check Out</Typography>
                <Calendar onChange={setCheckOut} value={checkOut} />
            </Box>
        </Box>
    )
}
export default SeleccionarFechas;