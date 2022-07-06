import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { DataContext } from '../../context/DataContext';
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function AgregarUsuario() {

    const navigate = useNavigate();
    const { estaBorrado, setEstaBorrado } = useContext(DataContext);
    //Se guarda primero el usuario en el useState
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        rol: ''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }
    useEffect(() => {
        console.log(usuario);
    }, [usuario])

    //validar el formulario
    const ValidarUsuario = () => {
        //Destructuring
        const { _idUsuario, nombre, correo, contrasena, rol } = usuario;

        //Revisa que no haya campos vacíos
        let valido = !nombre.length || !correo.length || !contrasena.length || !rol.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un usuario nuevo
    const GuardarUsuario = e => {
        e.preventDefault();

        clienteAxios.post('/crear-cuenta', usuario)
            .then(res => {
                console.log(res)
                Swal.fire(
                    'Se agregó el usuario',
                    res.data.mensaje,
                    'success'
                )
            });
        setEstaBorrado({ usuarioBorrado: true });
        navigate('/usuario');
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
                    <Typography variant="h4" component="h1">Agregar Usuario</Typography>
                    <form onSubmit={GuardarUsuario}>
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
                            name="contrasena"
                            label="Contraseña"
                            placeholder="Ingrese la contraseña"
                            type="password"
                            id="contrasena"
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
                            <InputLabel id="rol-label">Rol de usuario</InputLabel>
                            <Select
                                labelId="rol-label"
                                id="rol"
                                value={usuario.rol}
                                label="Ingrese el tipo de cédula"
                                name="rol"
                                onChange={e => actualizarState(e)}
                            >
                                <MenuItem value={'Administrativo'}>Administrativo</MenuItem>
                                <MenuItem value={'Recepcionista'}>Recepcionista</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="enviar">
                            <Button
                                type="submit"
                                disabled={ValidarUsuario()}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Agregar usuario
                            </Button>
                        </div>

                    </form>
                </Box>
            </Box>

        </Fragment>
    )
}

export default AgregarUsuario;