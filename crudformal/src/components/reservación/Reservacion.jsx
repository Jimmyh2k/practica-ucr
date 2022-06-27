import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom'
import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';

function Reservacion(props) {
    //console.log(props.cliente.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idReservacion, cantidadDePersonas, checkIn, checkOut, comentarios, idCliente, idHabitacion, cliente, habitacion } = props.reservacion;
    console.log(props.reservacion)
    console.log(cliente);
    console.log(habitacion);
    //Eliminar Reservacion
    const eliminarReservacion = (id) => {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "¡Los cambios no se pueden revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/reservacion/${idReservacion}`)
                    .then(res => {
                        Swal.fire(
                            'Eliminado',
                            res.data.mensaje,
                            'success'
                        );
                    });
            }
        })
    }
    const fechaConFormato = (fechaSinFormato) => {
        const date = new Date(fechaSinFormato);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    if (props.card) {
        return (
            <Grid item xs={6} >
                <Card sx={{}}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                <PersonIcon />
                                <Typography variant="h6" component="h3">
                                    Cliente
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" component="h3">
                                {cliente.nombre}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                                Habitación
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                <NumbersIcon />
                                <Typography variant="subtitle1" component="h3">
                                    {habitacion.numero}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                <CalendarMonthOutlinedIcon />
                                <Typography variant="h6" component="h3">
                                    CheckIn
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" component="h3">
                                {fechaConFormato(checkIn)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                <CalendarMonthOutlinedIcon />
                                <Typography variant="h6" component="h3">
                                    CheckOut
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" component="h3">
                                {fechaConFormato(checkOut)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0.5rem' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                                <Typography variant="h6" component="h3">
                                    Cantidad de personas
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" component="h3">
                                {cantidadDePersonas}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={`/reservacion/editar/${idReservacion}`} sx={{ marginRight: 1 }}>
                            Editar
                        </Button>
                        <Button size="small" onClick={() => eliminarReservacion(idReservacion)}>
                            Eliminar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        )
    }
    return (

        <TableRow sx={{ display: {} }} key={habitacion.idHabitacion}>
            <TableCell>
                {cliente.nombre}
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {habitacion.numero}
                </Typography>
            </TableCell>
            <TableCell align="right">
                {fechaConFormato(checkIn)}
            </TableCell>
            <TableCell align="right">
                {fechaConFormato(checkOut)}
            </TableCell>
            <TableCell align="right">
                {cantidadDePersonas}
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" component={Link} to={`/reservacion/editar/${idReservacion}`} startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                        Editar
                    </Button>
                    <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarReservacion(idReservacion)}>
                        Eliminar
                    </Button>
                </Box>
            </TableCell>
        </TableRow >

    )
}

export default Reservacion;
    // <li className="cliente">
    //     <div className="info-cliente">
    //         <p className="nombre">Cantidad de personas: {cantidadDePersonas}</p>
    //         <p className="empresa">CheckIn: {checkIn}</p>
    //         <p className="empresa">CheckOut:{checkOut}</p>
    //         <p className="empresa">Comentarios: {comentarios}</p>
    //         <p className="empresa">IdCliente:{idCliente}</p>
    //         <p className="empresa">Cliente:{cliente.nombre}</p>--
    //         <p className="empresa">IdHabitacion:{idHabitacion}</p>
    //         <p className="empresa">Habitacion escojida:{habitacion.numero}</p>
    //     </div>
    //     <div className="acciones">
    //         <Link to={`/reservacion/editar/${idReservacion}`} className="btn btn-azul">
    //             <i className="fas fa-pen-alt"></i>
    //             Editar Reservacion
    //         </Link>
    //         <button
    //             type="button"
    //             className="btn btn-rojo btn-eliminar"
    //             onClick={() => eliminarReservacion(idReservacion)}>
    //             <i className="fas fa-times"></i>
    //             Eliminar Reservacion
    //         </button>
    //     </div>
    // </li>