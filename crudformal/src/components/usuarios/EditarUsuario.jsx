import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function EditarUsuario() {

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero el usuario en el useState
    const [usuario, datosUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        rol: ''
    });

    //Query a la api
    const consultarApi = async () => {
        const clienteConsulta = await clienteAxios.get(`/usuarios/${id}`);
        console.log(clienteConsulta.data);
        datosUsuario(clienteConsulta.data);
    }

    useEffect(() => {
        consultarApi();
    }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        datosUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    // Envia una petición por axios para actualizar el usuario
    const actualizarUsuario = e => {
        e.preventDefault();

        // enviar petición por axios
        clienteAxios.put(`/usuarios/${usuario.idUsuario}`, usuario)
            .then(res => {
                // validar si hay errores de mongo 
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Ese usuario ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó Correctamente',
                        'success'
                    )
                }

                // redireccionar
                navigate('/usuario');
            })
    }

    //validar el formulario
    const ValidarUsuario = () => {
        //Destructuring
        const { _idUsuario, nombre, correo, contrasena, rol } = usuario;

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !contrasena.length || !rol.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }


    return (
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
                    <form onSubmit={actualizarUsuario}>
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
                            value={usuario.nombre}
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
                            value={usuario.correo}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="contrasena"
                            label="Nueva contraseña:"
                            placeholder="Ingrese la contraseña"
                            type="password"
                            id="contrasena"
                            onChange={actualizarState}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="rol-label">Rol:</InputLabel>
                            <Select
                                labelId="rol-label"
                                id="rol"
                                value={usuario.rol}
                                label="Rol:"
                                name="rol"
                                onChange={actualizarState}
                            >
                                <MenuItem value={'Administrativo'}>Administrativo</MenuItem>
                                <MenuItem value={'Recepcionista'}>Recepcionista</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            disabled={ValidarUsuario()}
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

export default EditarUsuario;