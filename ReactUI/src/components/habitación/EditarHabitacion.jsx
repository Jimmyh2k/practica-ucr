import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import { Typography, Box, TextField, Button } from '@mui/material'

function EditarHabitacion(props) {

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();


    //Se guarda primero la hab en el useState
    const [habitacion, datosHabitacion] = useState({
        numero: 0,
        camasIndividuales: 0,
        camasDobles: 0,
        recomendacionPrecioNacional: 0,
        recomendacionPrecioExtranjero: 0
    });

    //Query a la api
    const consultarApi = async () => {
        const habitacionConsulta = await clienteAxios.get(`/habitacion/${id}`);
        datosHabitacion(habitacionConsulta.data);
    }

    useEffect(() => {
        consultarApi();
    }, []);

    //Leer los datos del formulario
    const actualizarState = e => {
        //Almacena lo que el usuario escribe en el state
        datosHabitacion({
            ...habitacion,
            [e.target.name]: e.target.value
        })

    }

    // Envia una petición por axios para actualizar el la habitacion
    const actualizarHabitacion = e => {
        e.preventDefault();

        // enviar petición por axios
        clienteAxios.put(`/habitacion/${habitacion.idHabitacion}`, habitacion)
            .then(res => {
                // validar si hay errores de mongo 
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Esta habitacion ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó Correctamente',
                        'success'
                    )
                }

                // redireccionar
                navigate('/habitacion');
            })
    }

    //validar el formulario
    const ValidarHabitacion = () => {
        //Destructuring
        const { numero, camasIndividuales, camasDobles, recomendacionPrecioNacional, recomendacionPrecioExtranjero } = habitacion;

        //Revisa que no haya campos vacíos
        let valido = !numero.toString().length || !camasIndividuales.toString().length ||
            !camasDobles.toString().length || !recomendacionPrecioNacional.toString().length
            || !recomendacionPrecioExtranjero.toString().length;

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
                    <Typography variant="h4" component="h1">Agregar Habitacion</Typography>
                    <form onSubmit={actualizarHabitacion}>
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
                            value={habitacion.numero}
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
                            value={habitacion.camasIndividuales}
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
                            value={habitacion.camasDobles}

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
                            value={habitacion.recomendacionPrecioNacional}

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
                            value={habitacion.recomendacionPrecioExtranjero}
                        />
                        <Button
                            type="submit"
                            disabled={ValidarHabitacion()}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Guardar Cambios
                        </Button>
                    </form>
                </Box>
            </Box>

        </Fragment>
    )
}

export default EditarHabitacion;