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
            <h1>Detalles de la Factura</h1>
            <div className="info-cliente">
                        
                        <p className="empresa">Fecha de Emisión: {factura.fechaEmision}</p>
                        <p className="empresa">Condicion Venta: {factura.condicionVenta}</p>
                        <p className="empresa">Medio de Pago:{factura.MedioPago}</p>
                        <p className="empresa">Total Venta: {factura.totalVenta}</p>
                        
                    </div>

        </Fragment>
    )
}

export default DetallesFactura