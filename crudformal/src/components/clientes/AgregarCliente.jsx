import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function AgregarCliente() {

    const navigate = useNavigate();

    //Se guarda primero el cliente en el useState
    const [cliente, guardarCliente] = useState({
        nombre: '',
        correo: '',
        numeroTelefonico: '',
        cedula: '',
        tipoCedula: '01'
    });

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })

    }

    //validar el formulario
    const ValidarCliente = () => {
        //Destructuring
        const { _idCliente, nombre, correo, numeroTelefonico, cedula, tipoCedula } = cliente;

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !numeroTelefonico.length || !cedula.length
            || !tipoCedula.length;

        console.log(valido);
        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un cliente nuevo
    const GuardarCliente = e => {
        e.preventDefault();

        clienteAxios.post('/clientes', cliente)
            .then(res => {
                console.log(res)
                Swal.fire(
                    'Se agregó el cliente',
                    res.data.mensaje,
                    'success'
                )
            });
        navigate('/');
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
                    <Typography variant="h4" component="h1">Agregar Cliente</Typography>
                    <form onSubmit={GuardarCliente}>
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

export default AgregarCliente;