import React from "react";
import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Link } from 'react-router-dom'
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

function Factura(props) {
    //console.log(props.factura.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idFactura, fechaEmision, condicionVenta, MedioPago, totalVenta, idReservacion, reservacion } = props.factura;
    console.log(props.factura.reservacion.cliente.nombre);
    const fechaConFormato = (fechaSinFormato) => {
        const date = new Date(fechaSinFormato);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
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

    if (props.card) {
        return (
            <Grid item xs={6} >
                <Card sx={{}}>
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                                Fecha de emisión
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', gap: '0.5rem' }}>
                                <CalendarMonthOutlinedIcon />
                                <Typography variant="subtitle1" component="h3">
                                    {fechaConFormato(fechaEmision)}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                                Total venta
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {totalVenta}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                                Condición Venta
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {nombreCondicionDeVenta(condicionVenta)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', gap: '0.5rem' }}>
                            <Typography variant="h6" component="h3">
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={''} size="small" sx={{ marginRight: 1 }}>
                            Ver Detalles
                        </Button>
                        <Button startIcon={<SimCardDownloadOutlinedIcon />} size="small" onClick={''}>
                            XML
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default Factura;
{/* <li className="cliente">
    <div className="info-cliente">
        <p className="nombre">Nombre del cliente:{reservacion.cliente.nombre}</p>
        <p className="empresa">Fecha de Emisión: {fechaEmision}</p>
        <p className="empresa">Condicion Venta: {condicionVenta}</p>
        <p className="empresa">Medio de Pago:{MedioPago}</p>
        <p className="empresa">Total Venta: {totalVenta}</p>
        <p className="empresa">idReservacion:{idReservacion}</p>
        <p className="empresa">Habitacion Pagada:{reservacion.habitacion.numero}</p>
    </div>

</li> */}