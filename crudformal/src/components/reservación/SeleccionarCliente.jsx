import React, { useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { FacturaContext } from '../../context/FacturaContext';



function SeleccionarCliente() {


    const { seleccionDeCliente, actualizarReservacion, dataForUI } = useContext(FacturaContext);

    const rows = [
        { id: 1, nombre: 'Jon Snow', cedula: 604560017 },
        { id: 2, nombre: 'Cersei Lannister', cedula: 123446789 },
        { id: 3, nombre: 'Jaime Lannister', cedula: 123455789 },
        { id: 4, nombre: 'Arya Stark', cedula: 123456779 },
        { id: 5, nombre: 'Daenerys Targaryen', cedula: 123456789 },
        { id: 6, nombre: '- Melisandre', cedula: 123459789 },
        { id: 7, nombre: 'Ferrara Clifford', cedula: 103456789 },
        { id: 8, nombre: 'Rossini Frances', cedula: 122456789 },
        { id: 9, nombre: 'Harvey Roxie', cedula: 123458789 },
        { id: 10, nombre: 'Harvey Roxie', cedula: 123358789 },
        { id: 11, nombre: 'Harvey Roxie', cedula: 129458789 },
        { id: 12, nombre: 'Harvey Roxie', cedula: 12358789 },
    ];
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '90%' }}>
            <Box pl={2} pt={2} pb={2}>
                {seleccionDeCliente ? (
                    <p>Cliente: {dataForUI.datosDelCliente.nombre}</p>
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.cedula}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nombre}
                                </TableCell>
                                <TableCell align="left">{row.cedula}</TableCell>
                                <TableCell align="left">
                                    <Button variant="outlined" size="small" onClick={() => actualizarReservacion({ name: 'idCliente', value: row.id, dataForUI: { name: "datosDelCliente", value: row } })}>Seleccionar</Button>
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