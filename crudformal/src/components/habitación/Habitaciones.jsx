import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from '../../config/axios';
import Habitacion from "./Habitacion";
import { Link } from 'react-router-dom';
import { Typography,  Button, Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardActions, CardContent } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


function Habitaciones() {

    //Trabajar con useState
    const [habitaciones, guardarhabitaciones] = useState([]);
    //query al api
    const consultarAPI = async () => {
        const habitacionesConsulta = await clienteAxios.get('/habitacion');
        guardarhabitaciones(habitacionesConsulta.data);
    }

    //use effect es similar a componentdidmount y willmount
    useEffect(() => {
        consultarAPI();
    }, []); //EL [habitaciones] permite refrescar si hay un cambio, el arreglo vacio evita la iteracion


    return (
        <Fragment>
            {/*
            Versión de móvil
            se usan cards
            */}
            <Box pl={1} pr={1} sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
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
                    Habitaciones
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/habitacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nueva Habitacion
                </Button>
                <Box sx={{ width: '100%' }}>
                    <Grid pt={1} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                        {habitaciones.map(habitacion => (
                            <Habitacion

                                key={habitacion.idHabitacion}
                                habitacion={habitacion}
                                card={true}
                            />
                        ))}
                        
                    </Grid>

                </Box>
            </Box>
            {/*
            Versión de PC
            Se usa table
            */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
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
                    Habitaciones
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/habitacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nueva Habitacion
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla habitaciones">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        IdHabitacion
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                    Numero
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                       Camas Individuales
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                    Camas Dobles
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                    Precio Nacional
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                    Precio Extranjero
                                    </Typography>
                                </TableCell>


                                <TableCell align="right">

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: "100%" }}>
                            {habitaciones.map(habitacion => (
                                <Habitacion
                                    key={habitacion.idHabitacion}
                                    habitacion={habitacion}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment >
    )
    
  /*   return (
        <Fragment>
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
                Habitaciones
            </Typography>

            {/* <Link to={"/habitacion/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nueva Habitación
            </Link> }


            <Button variant="contained" component={Link} to="/habitacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                Nueva Habitación
            </Button>

            <ul className="listado-habitaciones">
                {habitaciones.map(habitacion => (
                    <Habitacion
                        key={habitacion.idHabitacion}
                        habitacion={habitacion}
                    />
                ))}
            </ul>
        </Fragment>
    ) */
}

export default Habitaciones;