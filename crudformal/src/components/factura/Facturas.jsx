import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from '../../config/axios';
import Factura from "./Factura";
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardActions, CardContent } from '@mui/material';
// import el Context
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

import { CRMContext } from '../../context/CRMContext';


function Facturas() {

    const navigate = useNavigate();

    //Trabajar con useState
    const [facturas, guardarfacturas] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    // use effect es similar a componentdidmount y willmount
    useEffect(() => {

        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const facturaConsulta = await clienteAxios.get('/factura', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // colocar el resultado en el state
                    guardarfacturas(facturaConsulta.data);

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
    }, []); //[facturas] es para refrescar buscar otra manera


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
                    Facturas
                </Typography>

                <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to={"/factura/nuevo"} color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                    Nueva factura
                </Button>
            </Box>
            {/* <h2>Facturas</h2> */}

            {/* <Link to={"/factura/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nueva factura
            </Link> */}

            {/* <ul className="listado-clientes">
                {facturas.map(factura => (
                    <Factura
                        key={factura.idFactura}
                        factura={factura}
                        card={true}
                    />
                ))}
            </ul> */}
            <Box sx={{ width: '100%' }}>
                <Grid pt={1} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                    {facturas.map(factura => (
                        <Factura
                            key={factura.idFactura}
                            factura={factura}
                            card={true}
                        />
                    ))}

                </Grid>

            </Box>
        </Fragment>
    )
}

export default Facturas;