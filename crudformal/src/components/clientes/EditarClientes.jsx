import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button } from '@mui/material'

function EditarCliente(props) {

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero el cliente en el useState
    const [cliente, datosCliente] = useState({
        nombre: '',
        correo: '',
        numeroTelefonico: 0,
        cedula: '',
        tipoCedula: ''
    });

    //Query a la api
    const consultarApi = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        console.log(clienteConsulta.data);
        datosCliente(clienteConsulta.data);
    }

    useEffect(() => {
        consultarApi();
    }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })

    }

    // Envia una petición por axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

        // enviar petición por axios
        clienteAxios.put(`/clientes/${cliente.idCliente}`, cliente)
            .then(res => {
                // validar si hay errores de mongo 
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó Correctamente',
                        'success'
                    )
                }

                // redireccionar
                navigate('/');
            })
    }

    //validar el formulario
    const ValidarCliente = () => {
        //Destructuring
        const { _idCliente, nombre, correo, numeroTelefonico, cedula, tipoCedula } = cliente;
        console.log(cliente.numeroTelefonico);
        console.log(numeroTelefonico);
        console.log("--------");

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !numeroTelefonico.toString().length || !cedula.length
            || !tipoCedula.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }


    return (
        // <Fragment>
        //     <h2>Editar Cliente</h2>

        //     <form onSubmit={actualizarCliente}>

        //         <legend>Llena todos los campos</legend>

        //         <div className="campo">
        //             <label>Nombre:</label>
        //             <input
        //                 type="text"
        //                 placeholder="Ingrese el nombre"
        //                 name="nombre"
        //                 onChange={actualizarState}
        //                 value={cliente.nombre}
        //             />
        //         </div>

        //         <div className="campo">
        //             <label>Correo Electronico:</label>
        //             <input
        //                 type="email"
        //                 placeholder="Ingrese el correo"
        //                 name="correo"
        //                 onChange={actualizarState}
        //                 value={cliente.correo}
        //             />
        //         </div>

        //         <div className="campo">
        //             <label>Numero Telefonico</label>
        //             <input
        //                 type="number"
        //                 placeholder="Ingrese el telefono"
        //                 name="numeroTelefonico"
        //                 onChange={actualizarState}
        //                 value={cliente.numeroTelefonico}
        //             />
        //         </div>

        //         <div className="campo">
        //             <label>Cédula:</label>
        //             <input
        //                 type="number"
        //                 placeholder="Ingrese la Cédula"
        //                 name="cedula"
        //                 onChange={actualizarState}
        //                 value={cliente.cedula}
        //             />
        //         </div>

        //         <div className="campo">
        //             <label>Tipo Cedula:</label>
        //             <input
        //                 type="text"
        //                 placeholder="Ingrese el tipo cédula"
        //                 name="tipoCedula"
        //                 onChange={actualizarState}
        //                 value={cliente.tipoCedula}
        //             />
        //         </div>

        //         <div className="enviar">
        //             <input
        //                 type="submit"
        //                 className="btn btn-azul"
        //                 value="Guardar Cambios"
        //                 disabled={ValidarCliente()}
        //             />
        //         </div>

        //     </form>

        // </Fragment >
        <Fragment>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'left',
                        backgroundColor: '#ffffff',
                        padding: '30px',
                        margin: { xs: '10px' },
                        borderRadius: '10px',
                        width: { xs: '90%', md: '70%', lg: '50%' },
                    }}
                >
                    <Typography variant="h4" component="h1">Editar Cliente</Typography>
                    <form onSubmit={actualizarCliente}>
                        <Typography variant="h6" component="h2">Llena todos los campos</Typography>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="nombre"
                            label="Nombre"
                            placeholder="Ingrese el nombre"
                            type="text"
                            id="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="correo"
                            label="Correo Electronico"
                            placeholder="Ingrese el correo"
                            type="email"
                            id="correo"
                            onChange={actualizarState}
                            value={cliente.correo}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="numeroTelefonico"
                            label="Numero Telefonico"
                            placeholder="Ingrese el telefono"
                            type="number"
                            id="numeroTelefonico"
                            onChange={actualizarState}
                            value={cliente.numeroTelefonico}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cedula"
                            label="Cédula"
                            placeholder="Ingrese la Cédula"
                            type="number"
                            id="cedula"
                            onChange={actualizarState}
                            value={cliente.cedula}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth

                            name="tipoCedula"
                            label="Ingrese el tipo cédula"
                            placeholder="Tipo Cedula"
                            type="text"
                            id="tipoCedula"
                            onChange={actualizarState}
                            value={cliente.tipoCedula}
                        />
                        <div className="enviar">
                            <Button
                                type="submit"
                                disabled={ValidarCliente()}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Agregar Cliente
                            </Button>
                        </div>

                    </form>
                </Box>
            </Box>

        </Fragment>
    )
}

export default EditarCliente;