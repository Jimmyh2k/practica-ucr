import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function DetallesFactura(props) {

    const navigate = useNavigate();

    //Obtener el id
    const { id } = useParams();



    const [factura, datosFactura] = useState({
        fechaEmision: '',
        condicionVenta: '',
        MedioPago: '',
        totalVenta: 0,
        reservacion: {},
    });

    //Query a la api
    const consultarApi = async () => {
        const facturaConsulta = await clienteAxios.get(`/factura/${id}`);
        console.log(facturaConsulta.data);
        datosFactura(facturaConsulta.data);
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
                <Typography variant="h4" component="h1">Detalles del Factura</Typography>
                <form >
                <p className="empresa">Fecha de Emisión: {factura.fechaEmision}</p>
                        <p className="empresa">Condicion Venta: {factura.condicionVenta}</p>
                        <p className="empresa">Medio de Pago:{factura.MedioPago}</p>
                        <p className="empresa">Total Venta: {factura.totalVenta}</p>
                   
                </form>
            </Box>
        </Box>

    </Fragment>
    )
}

export default DetallesFactura