import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

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
            <div className="info-cliente">
                        <p className="nombre">Nombre: {cliente.nombre}</p>
                        <p className="empresa">Correo: {cliente.correo}</p>
                        <p className="empresa">Telefono:{cliente.numeroTelefonico}</p>
                        <p className="empresa">Cédula: {cliente.cedula}</p>
                        <p className="empresa">Tipo Cédula:{cliente.tipoCedula}</p>
            </div>

        </Fragment>
    )
}

export default DetallesCliente;