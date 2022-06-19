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


function SeleccionarHabitacion() {

    const { seleccionDeHabitacion, actualizarReservacion, dataForUI } = useContext(FacturaContext);

    const rows = [
        { id: 0, numero: 1, camasDobles: 1, camasIndividuales: 2 },
        { id: 2, numero: 2, camasDobles: 1, camasIndividuales: 2 },
        { id: 3, numero: 3, camasDobles: 1, camasIndividuales: 2 },
        { id: 4, numero: 4, camasDobles: 1, camasIndividuales: 2 },
        { id: 5, numero: 5, camasDobles: 1, camasIndividuales: 2 },
        { id: 6, numero: 6, camasDobles: 1, camasIndividuales: 2 },
        { id: 7, numero: 7, camasDobles: 1, camasIndividuales: 2 },
        { id: 8, numero: 8, camasDobles: 1, camasIndividuales: 2 },
        { id: 9, numero: 9, camasDobles: 1, camasIndividuales: 2 },
        { id: 10, numero: 10, camasDobles: 1, camasIndividuales: 2 },
        { id: 11, numero: 11, camasDobles: 1, camasIndividuales: 2 },
        { id: 12, numero: 12, camasDobles: 1, camasIndividuales: 2 },
    ];
    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '90%' }}>
            <Box pl={2} pt={2} pb={2}>
                {seleccionDeHabitacion ? (
                    <p>Habitación: {dataForUI.datosDeHabitacion.numero}</p>
                ) : (
                    <p>Seleccione la habitación</p>
                )}
            </Box>
            <TableContainer sx={{ width: '100%', height: '100%' }}>
                <Table stickyHeader aria-label="table-clientes" sx={{}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Numero</TableCell>
                            <TableCell align="left">Camas dobles</TableCell>
                            <TableCell align="left">Camas individuales</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.numero}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.numero}
                                </TableCell>
                                <TableCell align="left">{row.camasDobles}</TableCell>
                                <TableCell align="left">{row.camasIndividuales}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small" onClick={() => (actualizarReservacion({ name: 'idHabitacion', value: row.id, dataForUI: { name: "datosDeHabitacion", value: row } }))}>Seleccionar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
export default SeleccionarHabitacion;