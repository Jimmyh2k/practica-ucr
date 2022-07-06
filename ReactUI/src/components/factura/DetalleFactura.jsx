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

    const nombreCondicionDeVenta = (codigoCondicionVenta) => {
        switch (codigoCondicionVenta) {
            case '01':
                return 'Contado'
                break;
            case '02':
                return 'Crédito'
                break;
            case '03':
                return 'Consignación'
                break;
            case '04':
                return 'Apartado'
                break;
            case '05':
                return 'Arrendamiento con opción de compra'
                break;
            case '06':
                return 'Arrendamiento en función financiera'
                break;
            case '07':
                return 'Cobro a favor de un tercero'
                break;
            case '08':
                return 'Servicios prestados al Estado a crédito'
                break;
            case '09':
                return 'Pago del servicios prestado al Estado'
                break;
            default:
                break;
        }
    }
    const nombreMedioDePAgo = (codigoMedioPAgo) => {
        switch (codigoMedioPAgo) {
            case '01':
                return 'Efectivo'
                break;
            case '02':
                return 'Tarjeta'
                break;
            case '03':
                return 'Cheque'
                break;
            case '04':
                return 'Transferencia - depósito bancario'
                break;
            case '05':
                return 'Recaudado por terceros'
                break;
        }
    }
    // <MenuItem value={'01'}></MenuItem>
    // <MenuItem value={'02'}></MenuItem>
    // <MenuItem value={'03'}></MenuItem>
    // <MenuItem value={'04'}></MenuItem>
    // <MenuItem value={'05'}></MenuItem>
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
                    <Typography variant="h4" component="h1">Detalles de la Factura</Typography>
                    <form >
                        <p className="empresa">Fecha de Emisión: {factura.fechaEmision}</p>
                        <p className="empresa">Condicion Venta: {nombreCondicionDeVenta(factura.condicionVenta)}</p>
                        <p className="empresa">Medio de Pago:{nombreMedioDePAgo(factura.MedioPago)}</p>
                        <p className="empresa">Total Venta: {factura.totalVenta}</p>

                    </form>
                </Box>
            </Box>

        </Fragment>
    )
}

export default DetallesFactura