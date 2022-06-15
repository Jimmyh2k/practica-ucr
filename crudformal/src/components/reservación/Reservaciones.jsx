import React from "react";
import { Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


function Reservaciones() {



    return (
        <div>
            <Typography variant="h4" gutterBottom component="h2"
                sx={{
                    mr: 2,
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    paddingTop: '2rem',
                    paddingBottom: '1rem'
                }}
            >
                Reservaciones
            </Typography>

            <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/reservacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                Nueva reservacion
            </Button>
        </div >
    )
}

export default Reservaciones;