import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from '../../config/axios';
import Usuario from "./Usuario";
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardActions, CardContent } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Usuarios() {

    const navigate = useNavigate();

    //Trabajar con useState
    const [usuarios, guardarusuarios] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    // use effect es similar a componentdidmount y willmount
    useEffect(() => {

        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const usuariosConsulta = await clienteAxios.get('/usuarios', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // colocar el resultado en el state
                    guardarusuarios(usuariosConsulta.data);

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
    }, []); //[usuarios] es para refrescar buscar otra manera


    // Si el state esta como false
    if (!auth.auth) {
        navigate('/iniciar-sesion'); //REVISAR
    }

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
                    Usuarios
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/usuario/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nuevo Usuario
                </Button>
                <Box sx={{ width: '100%' }}>
                    <Grid pt={1} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                        {usuarios.map(usuario => (
                            <Usuario
                                key={usuario.idUsuario}
                                usuario={usuario}
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
                    Usuarios
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/usuario/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nuevo Usuario
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla usuarios">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Nombre
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Correo
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Rol
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: "100%" }}>
                            {usuarios.map(usuario => (
                                <Usuario
                                    key={usuario.idUsuario}
                                    usuario={usuario}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment >
    )

}

export default Usuarios;