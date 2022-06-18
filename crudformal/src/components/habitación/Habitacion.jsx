import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom'

import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';

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
                        <Typography variant="h6" component="h3">
                            {idHabitacion}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {numero}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {camasIndividuales}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {camasDobles}
                        </Typography>
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
                {idHabitacion}
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {numero}
                </Typography>
            </TableCell>
            <TableCell align="right">
                {camasIndividuales}
            </TableCell>
            <TableCell align="right">
                {camasDobles}
            </TableCell>
            <TableCell align="right">
                {recomendacionPrecioNacional}
            </TableCell>
            <TableCell align="right">
                {recomendacionPrecioExtranjero}
            </TableCell>
            <TableCell align="right">
                <Button variant="outlined" component={Link} to={`/habitacion/editar/${idHabitacion}`} startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                    Editar
                </Button>
                <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarHabitacion(idHabitacion)}>
                    Eliminar
                </Button>

            </TableCell>
        </TableRow >

    )
}

export default Habitacion;