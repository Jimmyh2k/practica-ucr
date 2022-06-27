import React, { useEffect, useState, Fragment, useContext } from "react";
import { Button, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import clienteAxios from '../../config/axios';
import Reservacion from "./Reservacion";

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Reservaciones() {



    const navigate = useNavigate();

    //Trabajar con useState
    const [reservaciones, guardarreservaciones] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    // use effect es similar a componentdidmount y willmount
    useEffect(() => {

        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const reservacionesConsulta = await clienteAxios.get('/reservacion', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // colocar el resultado en el state
                    guardarreservaciones(reservacionesConsulta.data);

                } catch (error) {
                    // Error con authorizacion
                    if (error.response.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, []); //[clientes] es para refrescar buscar otra manera


    // Si el state esta como false
    if (!auth.auth) {
        navigate('/iniciar-sesion'); //REVISAR
    }

    return (
        <Fragment>
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
                    Reservaciones
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/reservacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nueva reservacion
                </Button>

                <Box sx={{ width: '100%' }}>
                    <Grid pt={1} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}  >
                        {reservaciones.map(reservacion => (
                            <Reservacion
                                key={reservacion.idReservacion}
                                reservacion={reservacion}
                                card={true}
                            />
                        ))}
                    </Grid>
                </Box>

                {/* <ul className="listado-clientes">
                    {reservaciones.map(reservacion => (
                        <Reservacion
                            key={reservacion.idReservacion}
                            reservacion={reservacion}
                        />
                    ))}
                </ul> */}
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mx: '2rem' }}>
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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla clientes">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Cliente
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Habitación
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        CheckIn
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        CheckOut
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Cantidad de personas
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: "100%" }}>
                            {reservaciones.map(reservacion => (
                                <Reservacion
                                    key={reservacion.idReservacion}
                                    reservacion={reservacion}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment >
    )
}

export default Reservaciones;