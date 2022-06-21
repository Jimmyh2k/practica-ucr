import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FacturaContext } from '../../context/FacturaContext';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';
import { useNavigate } from 'react-router-dom';

function SeleccionarCliente() {


    const { seleccionDeCliente, actualizarReservacion, reservacion, clientes, setClientes } = useContext(FacturaContext);
    const navigate = useNavigate();

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
                    console.error(error);
                    // Error con authorizacion
                    if (error.response.status === 500) {
                        navigate('/reservacion');
                    }
                }
            }
            consultarAPI();
        } else {
            navigate('/reservacion');
        }
    }, []);
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '90%' }}>
            <Box pl={2} pt={2} pb={2}>
                {seleccionDeCliente ? (
                    <p>Cliente: {(clientes.find(cliente => cliente.idCliente === reservacion.idCliente).nombre)}</p>
                    //array1.find(element => element > 10);
                ) : (
                    <p>Seleccione el cliente</p>
                )}
            </Box>
            <TableContainer sx={{ width: '100%', height: '100%' }}>
                <Table stickyHeader aria-label="table-clientes" sx={{}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="left">Cedula</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow
                                key={cliente.cedula}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {cliente.nombre}
                                </TableCell>
                                <TableCell align="left">{cliente.cedula}</TableCell>
                                <TableCell align="left">
                                    <Button variant="outlined" size="small" onClick={() => actualizarReservacion({ name: 'idCliente', value: cliente.idCliente, dataForUI: { name: "datosDelCliente", value: cliente } })}>Seleccionar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default SeleccionarCliente;