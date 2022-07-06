import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Typography, Box, FormLabel,TextField, Grid, Button, Select, MenuItem, InputLabel, FormControl, Card } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


function DetallesCliente(props) {

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
                    <Typography variant="h4" component="h1">Detalles del Cliente</Typography>
                    <form >
                        
                    <p className="nombre">Nombre: {cliente.nombre}</p>
                        <p >Correo: {cliente.correo}</p>
                        <p >Telefono:{cliente.numeroTelefonico}</p>
                        <p >Cédula: {cliente.cedula}</p>
                        <p>Tipo Cédula:{cliente.tipoCedula}</p>

                       
                       
                    </form>
                </Box>
            </Box>

        </Fragment>

    
    )
}

export default DetallesCliente;