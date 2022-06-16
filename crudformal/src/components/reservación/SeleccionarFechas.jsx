import React from "react";
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';


function SeleccionarFechas() {
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [fechasCorrectas, setFechasCorrectas] = useState(true);
    return (
        <Box sx={{ display: 'flex', flexDirection: { ms: 'column', md: 'row' }, justifyContent: 'space-around' }}>
            <div>
                <h2>Seleccionar Check In</h2>
                <Calendar onChange={setCheckIn} value={checkIn} />
            </div>
            <div>
                <h2>Seleccionar Check Out</h2>
                <Calendar onChange={setCheckOut} value={checkOut} />
            </div>
        </Box>
    )
}
export default SeleccionarFechas;