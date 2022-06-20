import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

import { Link } from 'react-router-dom'

import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';


function Usuario(props) {
    //console.log(props.usuario.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idUsuario, nombre, correo, contrasena, rol } = props.usuario;

    //Eliminar usuario
    const eliminarUsuario = (id) => {

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
                clienteAxios.delete(`/usuarios/${idUsuario}`)
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
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'medium' }}>
                                Rol
                            </Typography>
                            <Typography variant="subtitle1" component="p" gutterBottom>
                                {`: ${rol}`}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ marginRight: 1 }}>
                            Editar
                        </Button>
                        <Button size="small" onClick={() => eliminarUsuario(idUsuario)}>
                            Eliminar
                        </Button>
                    </CardActions>
                </Card>
            </Grid >
        )
    }
    return (
        <TableRow sx={{ display: {} }} key={idUsuario}>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {nombre}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {correo}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {rol}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" startIcon={<EditIcon />} sx={{ marginRight: 1 }}>
                        Editar
                    </Button>
                    <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarUsuario(idUsuario)}>
                        Eliminar
                    </Button>
                </Box>
            </TableCell>
        </TableRow >


    )

}

export default Usuario;