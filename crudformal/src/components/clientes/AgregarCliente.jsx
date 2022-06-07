import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button } from '@mui/material'

function AgregarCliente() {

    const navigate = useNavigate();

    //Se guarda primero el cliente en el useState
    const [cliente, guardarCliente] = useState({
        nombre: '',
        correo: '',
        numeroTelefonico: '',
        cedula: '',
        tipoCedula: ''
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
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'left',
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '10px',
                    width: "30%"
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
                    {/* <div className="campo">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            placeholder="Ingrese el nombre"
                            name="nombre"
                            onChange={actualizarState}
                        />
                    </div> */}

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
                    {/* <div className="campo">
                        <label>Correo Electronico:</label>
                        <input
                            type="email"
                            placeholder="Ingrese el correo"
                            name="correo"
                            onChange={actualizarState}
                        />
                    </div> */}

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
                    {/* <div className="campo">
                        <label>Numero Telefonico</label>
                        <input
                            type="number"
                            placeholder="Ingrese el telefono"
                            name="numeroTelefonico"
                            onChange={actualizarState}
                        />
                    </div> */}

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
                    {/* <div className="campo">
                        <label>Cédula:</label>
                        <input
                            type="number"
                            placeholder="Ingrese la Cédula"
                            name="cedula"
                            onChange={actualizarState}
                        />
                    </div> */}

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
                    />

                    {/* <div className="campo">
                        <label>Tipo Cedula:</label>
                        <input
                            type="text"
                            placeholder="Ingrese el tipo cédula"
                            name="tipoCedula"
                            onChange={actualizarState}
                        />
                    </div> */}

                    <div className="enviar">
                        {/* <input
                            type="submit"
                            className="btn btn-azul"
                            value="Agregar Cliente"
                            
                        /> */}
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

        </Fragment>
    )
}

export default AgregarCliente;