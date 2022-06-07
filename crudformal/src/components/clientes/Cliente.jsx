import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell } from '@mui/material';

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

    return (
        <TableRow>

            <TableCell>
                {nombre}
            </TableCell>
            <TableCell>
                {correo}
            </TableCell>
            <TableCell>
                {numeroTelefonico}
            </TableCell>
            <TableCell>
                {cedula}
            </TableCell>
            <TableCell>
                {tipoCedula}
            </TableCell>
            <TableCell>
                <Button size="small"><i className="fas fa-pen-alt"></i> Editar</Button>
                <Button size="small"><i className="fas fa-times"></i> Eliminar</Button>
                {/* 
                <a href="#" className="btn btn-azul">
                    
                    
                </a>

                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(idCliente)}>

                    
                    
                </button> */}
            </TableCell>
        </TableRow>



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
    )
}

export default Cliente;