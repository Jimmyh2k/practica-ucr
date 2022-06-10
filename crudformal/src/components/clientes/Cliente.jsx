import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditIcon from '@mui/icons-material/Edit';

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
                        <Typography variant="h6" component="h3">
                            {nombre}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {correo}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {numeroTelefonico}
                        </Typography>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            {cedula}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" sx={{ marginRight: 1 }}>
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
    // {!props.products.length
    //     ? <p>No product matched the criteria</p> 
    //     : props.products.map(product => {... whatever your code is })
    //   }
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
            {/* <TableCell align="right">
                {tipoCedula}
            </TableCell> */}
            <TableCell align="right">
                <Button variant="outlined" startIcon={<EditIcon />} sx={{ marginRight: 1 }}>

                    Editar

                </Button>
                <Button variant="outlined" startIcon={<ClearOutlinedIcon />} onClick={() => eliminarCliente(idCliente)}>
                    Eliminar
                </Button>
                {/* 
                <a href="#" className="btn btn-azul">
                    
                    
                </a>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(idCliente)}>

                    
                    
                </button> */}
            </TableCell>
        </TableRow >

    )
}

export default Cliente;
// <ListItem >
        //     <Box >

        //         <Card sx={{ width: 400, maxWidth: 450 }}>
        //             {/* <p className="nombre">Nombre: {nombre}</p>
        //             <p className="empresa">Correo: {correo}</p>
        //             <p className="empresa">Telefono:{numeroTelefonico}</p>
        //             <p className="empresa">Cédula: {cedula}</p>
        //             <p className="empresa">Tipo Cédula:{tipoCedula}</p> */}
        //             <CardContent>
        //                 <Typography variant="subtitle1" component="h2" gutterBottom>
        //                     Nombre: {nombre}
        //                 </Typography>
        //                 <Typography variant="subtitle1" component="h2" gutterBottom>
        //                     Correo: {correo}
        //                 </Typography>
        //                 <Typography variant="subtitle1" component="h2" gutterBottom>
        //                     Telefono:{numeroTelefonico}
        //                 </Typography>
        //                 <Typography variant="subtitle1" component="h2" gutterBottom>
        //                     Cédula: {cedula}
        //                 </Typography>
        //                 <Typography variant="subtitle1" component="h2" gutterBottom>
        //                     Tipo Cédula:{tipoCedula}
        //                 </Typography>
        //             </CardContent>
        //         </Card>
        //     </Box>
        //     <CardActions>
        // <a href="#" className="btn btn-azul">
        //     <i className="fas fa-pen-alt"></i>
        //     Editar Cliente
        // </a>

        // <button
        //     type="button"
        //     className="btn btn-rojo btn-eliminar"
        //     onClick={() => eliminarCliente(idCliente)}>

        //     <i className="fas fa-times"></i>
        //     Eliminar Cliente
        // </button>
        //         <Button size="small">Share</Button>
        //         <Button size="small">Learn More</Button>
        //     </CardActions>
        // </ListItem>