import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom'

import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import BedIcon from '@mui/icons-material/Bed';
import NumbersIcon from '@mui/icons-material/Numbers';

function Habitacion(props) {
    //console.log(props.habitacion.nombre); //Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idHabitacion, numero, camasIndividuales, camasDobles, recomendacionPrecioNacional, recomendacionPrecioExtranjero } = props.habitacion;

    //Eliminar Habitacion
    const eliminarHabitacion = (id) => {

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
                clienteAxios.delete(`/habitacion/${idHabitacion}`)
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
    if (props.card) {
        return (
            <Grid item xs={6} >
                <Card sx={{}}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <NumbersIcon />
                            <Typography variant="h6" component="h3">
                                Número de habitación: {numero}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <SingleBedIcon />
                            <Typography variant="subtitle1" component="p" gutterBottom>
                                Camas Individuales: {camasIndividuales}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <BedIcon />
                            <Typography variant="subtitle1" component="p" gutterBottom>
                                Camas dobles: {camasDobles}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <Typography variant="subtitle1" component="p" gutterBottom>
                                Precios recomendasos:
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" component="p" gutterBottom>
                                Nacionales {recomendacionPrecioNacional}
                            </Typography>
                            <Typography variant="body2" component="p" gutterBottom>
                                Extranjeros {recomendacionPrecioExtranjero}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={`/habitacion/editar/${idHabitacion}`} size="small" sx={{ marginRight: 1 }}>
                            Editar
                        </Button>
                        <Button size="small" onClick={() => eliminarHabitacion(idHabitacion)}>
                            Eliminar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
    return (

        <TableRow sx={{ display: {} }} key={idHabitacion}>
            <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <NumbersIcon />
                    {numero}
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <SingleBedIcon />
                    {camasIndividuales}
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <BedIcon />
                    {camasDobles}
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {recomendacionPrecioNacional}
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    {recomendacionPrecioExtranjero}
                </Box>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" component={Link} to={`/habitacion/editar/${idHabitacion}`} startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                        Editar
                    </Button>
                    <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarHabitacion(idHabitacion)}>
                        Eliminar
                    </Button>
                </Box>
            </TableCell>
        </TableRow >

    )
}

export default Habitacion;