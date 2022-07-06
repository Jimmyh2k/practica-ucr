import React, { useContext, useEffect } from "react";
import clienteAxios from '../../config/axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { DataContext } from '../../context/DataContext';
import { CRMContext } from '../../context/CRMContext';



function SeleccionarHabitacion() {

    const { seleccionDeHabitacion, actualizarReservacion, dataForUI } = useContext(DataContext);


    const [auth, guardarAuth] = useContext(CRMContext);
    const navigate = useNavigate();
    const { habitaciones, setHabitaciones, estaBorrado, setEstaBorrado } = useContext(DataContext);
    //query al api
    const consultarAPI = async () => {
        try {

            const habitacionesConsulta = await clienteAxios.get('/habitacion', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            setHabitaciones(habitacionesConsulta.data);
        }
        catch (error) {
            // Error con authorizacion
            if (error.response.status === 500) {
                navigate('/iniciar-sesion');
            }
        }
    }

    //use effect es similar a componentdidmount y willmount
    useEffect(() => {
        consultarAPI();
    }, []); //EL [habitaciones] permite refrescar si hay un cambio, el arreglo vacio evita la iteracion

    if (estaBorrado.habitacionBorrada) {
        consultarAPI();
        setEstaBorrado({ habitacionBorrada: false });
    }
    if (!auth.auth) {
        navigate('/iniciar-sesion'); //REVISAR
    }
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
                        {habitaciones.map((habitacion) => (
                            <TableRow
                                key={habitacion.numero}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {habitacion.numero}
                                </TableCell>
                                <TableCell align="left">{habitacion.camasDobles}</TableCell>
                                <TableCell align="left">{habitacion.camasIndividuales}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" size="small" onClick={() => (actualizarReservacion({ name: 'idHabitacion', value: habitacion.idHabitacion, dataForUI: { name: "datosDeHabitacion", value: habitacion } }))}>Seleccionar</Button>
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