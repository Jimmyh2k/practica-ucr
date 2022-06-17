import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';


function SeleccionarCliente() {
    const [selectedRow, setSelectedRow] = useState({});
    const [seleccionDeCliente, setSeleccionDeCliente] = useState(false);

    useEffect(() => {
        if (seleccionDeCliente === false) { setSeleccionDeCliente(true) };
        console.log(selectedRow, seleccionDeCliente);
    }, [selectedRow, seleccionDeCliente]);
    const rows = [
        { id: 1, nombre: 'Jon Snow', cedula: 604560017 },
        { id: 2, nombre: 'Cersei Lannister', cedula: 123446789 },
        { id: 3, nombre: 'Jaime Lannister', cedula: 123455789 },
        { id: 4, nombre: 'Arya Stark', cedula: 123456779 },
        { id: 5, nombre: 'Daenerys Targaryen', cedula: 123456789 },
        { id: 6, nombre: '- Melisandre', cedula: 123459789 },
        { id: 7, nombre: 'Ferrara Clifford', cedula: 103456789 },
        { id: 8, nombre: 'Rossini Frances', cedula: 122456789 },
        { id: 9, nombre: 'Harvey Roxie', cedula: 123458789 }
    ];
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '30rem' }}>
            <Box pl={2} pt={2} pb={2}>
                {seleccionDeCliente ? (
                    <p>Cliente: {selectedRow.nombre}</p>
                ) : (
                    <p>Seleccione el cliente</p>
                )}
            </Box>
            <TableContainer sx={{ width: '70%' }}>
                <Table aria-label="table clientes" sx={{ border: '1px solid #bdbdbd' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="left">Calories</TableCell>
                            <TableCell align="rigt"></TableCell>
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
                                <TableCell align="rigt">
                                    <Button variant="outlined" size="small" onClick={() => setSelectedRow(row)}>Seleccionar</Button>
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