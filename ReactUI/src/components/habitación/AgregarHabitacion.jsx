import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button } from '@mui/material'

function AgregarHabitacion() {

    const navigate = useNavigate();

    //Se guarda primero la habitacion en el useState
    const [habitacion, guardarHabitacion] = useState({
        numero: '',
        camasIndividuales: '',
        camasDobles: '',
        recomendacionPrecioNacional: '',
        recomendacionPrecioExtranjero: ''
    });

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        guardarHabitacion({
            ...habitacion,
            [e.target.name]: e.target.value
        })

    }

    //validar el formulario
    const ValidarHabitacion = () => {
        //Destructuring
        const { numero, camasIndividuales, camasDobles, recomendacionPrecioNacional, recomendacionPrecioExtranjero } = habitacion;

        //Revisa que no haya campos vacíos
        let valido = !numero.length || !camasIndividuales.length || !camasDobles.length || !recomendacionPrecioNacional.length
            || !recomendacionPrecioExtranjero.length;

        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api una habitacion nueva
    const GuardarHabitacion = e => {
        e.preventDefault();

        clienteAxios.post('/habitacion', habitacion)
            .then(res => {
                Swal.fire(
                    'Se agregó la habitacion',
                    res.data.mensaje,
                    'success'
                )
            });
        navigate('/habitacion');
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
                    <Typography variant="h4" component="h1">Agregar Habitacion</Typography>
                    <form onSubmit={GuardarHabitacion}>
                        <Typography variant="h6" component="h2">Llena todos los campos</Typography>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="numero"
                            label="Numero de Hab."
                            placeholder="Ingrese la cantidad"
                            type="text"
                            id="numero"
                            onChange={actualizarState}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="camasIndividuales"
                            label="Camas Individuales"
                            placeholder="Ingrese la cantidad"
                            type="number"
                            id="camasIndividuales"
                            onChange={actualizarState}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="camasDobles"
                            label="Camas dobles"
                            placeholder="Ingrese la cantidad"
                            type="number"
                            id="camasDobles"
                            onChange={actualizarState}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="recomendacionPrecioNacional"
                            label="Precio Nacionales"
                            placeholder="Ingrese la Cédula"
                            type="number"
                            id="recomendacionPrecioNacional"
                            onChange={actualizarState}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="recomendacionPrecioExtranjero"
                            label="Precio Extranjeros"
                            placeholder="Tipo Cedula"
                            type="number"
                            id="recomendacionPrecioExtranjero"
                            onChange={actualizarState}
                        />
                        <Button
                            type="submit"
                            disabled={ValidarHabitacion()}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Agregar Habitación
                        </Button>
                    </form>
                </Box>
            </Box>

        </Fragment>
    )



}

export default AgregarHabitacion;