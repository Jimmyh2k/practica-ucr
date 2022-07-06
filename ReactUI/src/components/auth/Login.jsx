import React, { useState, useContext, useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Container, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'



// Context
import { CRMContext } from '../../context/CRMContext';

function Login() {

    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    const [credenciales, guardarCredenciales] = useState({});
    const navigate = useNavigate();

    const iniciarSesion = async e => {
        e.preventDefault();

        //Autentica al usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);

            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )
            navigate('/');

        } catch (error) {
            Swal.fire({
                type: 'error', title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '10px'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>

                <form onSubmit={iniciarSesion}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="correo"
                        type="text"
                        label="Correo Electronico"
                        name="correo"
                        autoComplete="email"
                        autoFocus
                        onChange={leerDatos}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="contrasena"
                        label="Password"
                        type="password"
                        id="contrasena"
                        autoComplete="current-password"
                        onChange={leerDatos}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >              Iniciar Sesión
                    </Button>
                </form>

            </Box>
        </Container >
    );
}

export default Login;


