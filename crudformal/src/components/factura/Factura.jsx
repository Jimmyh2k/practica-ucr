import React, { useContext, useState } from "react";
import { ListItem, Box, Typography, Paper, Card, CardContent, CardActions, Button, TableRow, TableCell, Grid } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Link } from 'react-router-dom'
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { DataContext } from '../../context/DataContext';
import exportFromJSON from "export-from-json";



function Factura(props) {
    //console.log(props.factura.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const { idFactura, fechaEmision, condicionVenta, MedioPago, totalVenta, idReservacion, reservacion } = props.factura;
    const [cliente, setCliente] = useState({});
    const [habitacion, sethabitacion] = useState({});
    console.log("Reservacion", reservacion);
    console.log(props.factura.reservacion.cliente.nombre);
    const fechaConFormato = (fechaSinFormato) => {
        const date = new Date(fechaSinFormato);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
     

     function download() {
    const data = props.factura;   //dataForXml
    const fileName = props.fileName ? props.fileName : "factura";
    let fields = props.fields ? props.fields : [];  
    const exportType = 'xml';
    exportFromJSON({data, fileName, fields, exportType})
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
                                Reservación
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                Cliente
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {reservacion.cliente.nombre}
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                Habitación
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {reservacion.habitacion.numero}
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                CheckIn
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {fechaConFormato(reservacion.checkIn)}
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                CheckOut
                            </Typography>
                            <Typography variant="subtitle1" component="h3">
                                {fechaConFormato(reservacion.checkOut)}
                            </Typography>
                        </Box>
                        
                    </CardContent>
                    <CardActions>
                        <Button component={Link} to={''} size="small" sx={{ marginRight: 1 }}>
                            Ver Detalles
                        </Button>
                        <Button startIcon={<SimCardDownloadOutlinedIcon />} size="small" onClick={download}>
                            XML
                        </Button>
                    </CardActions>
                </Card>
            </Grid >
        )
    }
    return (
        <TableRow sx={{ display: {} }} key={idFactura}>
            <TableCell>
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {fechaConFormato(fechaEmision)}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {totalVenta}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {reservacion.cliente.nombre}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {reservacion.habitacion.numero}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {fechaConFormato(reservacion.checkIn)}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                    {fechaConFormato(reservacion.checkOut)}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="outlined" component={Link} to={''} startIcon={<VisibilityOutlinedIcon />} sx={{ marginRight: 1 }}>
                        Ver detalles
                    </Button>
                    <Button variant="outlined" startIcon={<SimCardDownloadOutlinedIcon />} onClick={download}>
                        Descargar XML
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    )
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