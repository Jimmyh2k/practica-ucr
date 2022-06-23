import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from '../../config/axios';
import Cliente from "./Cliente";
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button, Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardActions, CardContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { ReservacionContext } from '../../context/ReservacionContext';
// import el Context
import { CRMContext } from '../../context/CRMContext';
import { styled } from '@mui/material/styles';




function Clientes() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    var XML = "HHHHHH";


    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([XML], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "Factura.txt";
        document.body.appendChild(element);
        element.click();
    };


    const navigate = useNavigate();

    //Trabajar con useState
    // const [clientes, guardarclientes] = useState([]);
    const { seleccionDeCliente, actualizarReservacion, reservacion, clientes, setClientes } = useContext(ReservacionContext);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);


    // use effect es similar a componentdidmount y willmount
    useEffect(() => {


        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // colocar el resultado en el state
                    setClientes(clientesConsulta.data);

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
                    Clientes
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/clientes/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nuevo Cliente
                </Button>
                <Box sx={{ width: '100%' }}>
                    <Grid pt={1} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}  >


                        {clientes.map(cliente => (

                            <Cliente

                                key={cliente.idCliente}
                                cliente={cliente}
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
                    Clientes
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/clientes/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nuevo Cliente
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla clientes">
                        <TableHead>
                            <TableRow>
                                <TableCell>
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
                                        Telefono
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        Cédula
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: "100%" }}>
                            {clientes.map(cliente => (
                                <Cliente
                                    key={cliente.idCliente}
                                    cliente={cliente} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Button variant="contained" color="primary" onClick={downloadTxtFile}> Descargar XML </Button>


        </Fragment >


    )
}

export default Clientes;