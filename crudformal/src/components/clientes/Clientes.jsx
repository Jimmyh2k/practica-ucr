import React, { useEffect, useState, Fragment, useContext } from "react";
import clienteAxios from '../../config/axios';
import Cliente from "./Cliente";
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button, Box, List, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Clientes() {

    const navigate = useNavigate();

    //Trabajar con useState
    const [clientes, guardarclientes] = useState([]);

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
                    guardarclientes(clientesConsulta.data);

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
            {/* <h2>Clientes</h2> */}
            <Typography variant="h5" gutterBottom component="h2">
                Clientes
            </Typography>

            {/* <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link> */}
            <Button variant="contained" component={Link} to="/clientes/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
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
                            <TableCell align="right">

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ width: "100%" }}>
                        {clientes.map(cliente => (
                            <Cliente

                                key={cliente.idCliente}
                                cliente={cliente}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment >








        // <Fragment>
        //     {/* <h2>Clientes</h2> */}
        //     <Typography variant="h5" gutterBottom component="h2">
        //         Clientes
        //     </Typography>

        //     {/* <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        //         <i className="fas fa-plus-circle"></i>
        //         Nuevo Cliente
        //     </Link> */}
        //     <Button variant="contained" component={Link} to="/clientes/nuevo" color="secondary">
        //         <AddCircleOutlinedIcon />
        //         Nuevo Cliente
        //     </Button>
        //     <List className="listado-clientes">
        //         {clientes.map(cliente => (
        //             <Cliente
        //                 key={cliente.idCliente}
        //                 cliente={cliente}
        //             />
        //         ))}
        //     </List>
        // </Fragment>
    )
}

export default Clientes;