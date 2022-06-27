import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom'

import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function Cliente(props) {
    //console.log(props.cliente.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idCliente, nombre, correo, numeroTelefonico, cedula, tipoCedula } = props.cliente;

    //Eliminar Cliente
    const eliminarCliente = (id) => {

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
                clienteAxios.delete(`/clientes/${idCliente}`)
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
                            <PersonIcon />
                            <Typography variant="h6" component="h3">
                                {nombre}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <EmailIcon />
                            <Typography variant="body" component="p" gutterBottom>
                                {correo}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <LocalPhoneIcon />
                            <Typography variant="body" component="p" gutterBottom>
                                {numeroTelefonico}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCardIcon />
                            <Typography variant="body" component="p" gutterBottom>
                                {cedula}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={`/clientes/editar/${idCliente}`} sx={{ marginRight: 1 }}>
                            Detalles
                        </Button>
                        <Button size="small" component={Link} to={`/clientes/editar/${idCliente}`} sx={{ marginRight: 1 }}>
                            Editar
                        </Button>
                        <Button size="small" onClick={() => eliminarCliente(idCliente)}>
                            Eliminar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    return (

        <TableRow sx={{ display: {} }} key={cedula}>
            <TableCell>
                {nombre}
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {correo}
                </Typography>
            </TableCell>
            <TableCell align="right">
                {numeroTelefonico}
            </TableCell>
            <TableCell align="right">
                {cedula}
            </TableCell>

            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="outlined" component={Link} to={`/clientes/editar/${idCliente}`} startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                        Detalles
                    </Button>
                    <Button variant="outlined" component={Link} to={`/clientes/editar/${idCliente}`} startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                        Editar
                    </Button>
                    <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarCliente(idCliente)}>
                        Eliminar
                    </Button>
                </Box>
            </TableCell>
        </TableRow >

    )
}

export default Cliente;