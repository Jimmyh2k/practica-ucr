import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

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

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !numeroTelefonico.toString().length || !cedula.length
            || !tipoCedula.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }


    return (
        <Fragment>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '93vh'
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="tipoCedula-label">Ingrese el tipo de cédula</InputLabel>
                            <Select
                                labelId="tipoCedula-label"
                                id="tipoCedula"
                                value={cliente.tipoCedula}
                                label="Ingrese el tipo de cédula"
                                name="tipoCedula"
                                onChange={actualizarState}
                            >
                                <MenuItem value={'01'}>Cédula Física</MenuItem>
                                <MenuItem value={'02'}>Cédula Jurídica</MenuItem>
                                <MenuItem value={'03'}>DIMEX</MenuItem>
                                <MenuItem value={'04'}>NITE</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            disabled={ValidarCliente()}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Agregar Cliente
                        </Button>
                    </form>
                </Box>
            </Box>

        </Fragment>
    )
}

export default EditarCliente;