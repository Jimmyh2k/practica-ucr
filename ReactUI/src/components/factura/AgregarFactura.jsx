import React, { Fragment, useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom'
import { Typography, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { CRMContext } from '../../context/CRMContext';
import { DataContext } from '../../context/DataContext';
import DatePicker from 'react-date-picker';
import Swal from "sweetalert2";
function AgregarFactura() {

    const navigate = useNavigate();

    //Se guarda primero el factura en el useState
    const [factura, guardarFactura] = useState({
        fechaEmision: new Date(),
        condicionVenta: '01',
        MedioPago: '01',
        totalVenta: 0,
        idReservacion: 0
    });
    const [fecha, setFecha] = useState(new Date());
    const guaradrFecha = e => {
        guaradrFecha({ fechaEmision: e })
        // console.log(e);
    }
    const [auth, guardarAuth] = useContext(CRMContext);
    const { reservaciones, setReservaciones, clientes, habitaciones, estaBorrado, setEstaBorrado } = useContext(DataContext);
    const [value, onChange] = useState(new Date());


    //Leer los datos del formulario
    const actualizarState = e => {
        // console.log(e);
        //Almacena lo que el usuario escribe en el state
        guardarFactura({
            ...factura,
            [e.target.name]: e.target.value
        })

    }

    const consultarAPI = async () => {
        try {
            const reservacionesConsulta = await clienteAxios.get('/reservacion', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            // colocar el resultado en el state
            setReservaciones(reservacionesConsulta.data);

        } catch (error) {
            // Error con authorizacion
            if (error.response.status === 500) {
                navigate('/iniciar-sesion');
            }
        }
    }
    useEffect(() => {
        actualizarState({ target: "fechaEmision", value: fecha })
        // console.log(habitaciones);
        console.log("Factura: ", factura);
    }, [fecha])
    useEffect(() => {
        if (auth.token !== '') {
            if (reservaciones.length !== 0) {
                consultarAPI();
            }
            // Query a la API
        } else {
            navigate('/iniciar-sesion');
        }
    }, [])
    useEffect(() => {
        console.log(factura);
    }, [factura])

    //validar el formulario
    const ValidarFactura = () => {
        //Destructuring
        const { idFactura, fechaEmision, condicionVenta, MedioPago, totalVenta, idReservacion } = factura;

        //Revisa que no haya campos vacíos
        let valido = !condicionVenta.length || !MedioPago.length

        // console.log(valido);
        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un factura nuevo
    const GuardarFactura = e => {
        e.preventDefault();

        clienteAxios.post('/factura', factura)
            .then(res => {
                // console.log(res)
                Swal.fire(
                    'Se agregó la factura',
                    res.data.mensaje,
                    'success'
                )
            });
        navigate('/factura');
    }

    const fechaConFormato = (fechaSinFormato) => {
        const date = new Date(fechaSinFormato);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
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
                    <Typography variant="h4" component="h1">Agregar Cliente</Typography>
                    <form onSubmit={GuardarFactura}>
                        <Typography variant="h6" component="h2">Llena todos los campos</Typography>
                        <Box sx={{ my: '1rem' }}>
                            <Typography variant="subtitle1" component="h2">Fecha de emision:</Typography>
                            <DatePicker onChange={onChange} value={value} />
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="condicionVenta-label">Condicion Venta:</InputLabel>
                            <Select
                                labelId="condicionVenta-label"
                                id="condicionVenta"
                                value={factura.condicionVenta}
                                label="Condicion Venta:"
                                name="condicionVenta"
                                defaultValue={'01'}
                                onChange={actualizarState}
                            >
                                <MenuItem value={'01'}>Contado</MenuItem>
                                <MenuItem value={'02'}>Crédito</MenuItem>
                                <MenuItem value={'03'}>Consignación</MenuItem>
                                <MenuItem value={'04'}>Apartado</MenuItem>
                                <MenuItem value={'05'}>Arrendamiento con opción de compra</MenuItem>
                                <MenuItem value={'06'}>Arrendamiento en función financiera</MenuItem>
                                <MenuItem value={'07'}>Cobro a favor de un tercero</MenuItem>
                                <MenuItem value={'08'}>Servicios prestados al Estado a crédito</MenuItem>
                                <MenuItem value={'09'}>Pago del servicios prestado al Estado</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="MedioPago-label">Ingrese el medio de pago</InputLabel>
                            <Select
                                labelId="MedioPago-label"
                                id="MedioPago"
                                defaultValue='01'
                                value={factura.MedioPago}
                                label="Ingrese el medio de pago"
                                name="MedioPago"
                                onChange={actualizarState}
                            >
                                <MenuItem value={'01'}>Efectivo</MenuItem>
                                <MenuItem value={'02'}>Tarjeta</MenuItem>
                                <MenuItem value={'03'}>Cheque</MenuItem>
                                <MenuItem value={'04'}>Transferencia - depósito bancario</MenuItem>
                                <MenuItem value={'05'}>Recaudado por terceros</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="totalVenta"
                            label="Total Venta:"
                            placeholder="Ingrese el total venta"
                            type="number"
                            id="totalVenta"
                            onChange={actualizarState}
                        />
                        <Typography variant="subtitle1" component="h2">Seleccione una reservacion:</Typography>
                        <TableContainer sx={{ width: '100%', height: '10rem' }} component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="tabla clientes">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                                Cliente
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                                Habitación
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="subtitle1" component="h2" gutterBottom>
                                                Fechas de hospedaje
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ width: "100%" }}>
                                    {reservaciones.map(reservacion => (
                                        <TableRow sx={{ display: {} }} key={reservacion.idReservacion}>
                                            <TableCell>
                                                {
                                                    (clientes.find(
                                                        cliente => cliente.idCliente === reservacion.idCliente).nombre)
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography noWrap variant="subtitle1" component="h2" gutterBottom>
                                                    {
                                                        (habitaciones.find(
                                                            habitacion => habitacion.idHabitacion == reservacion.idHabitacion).numero)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                {fechaConFormato(reservacion.checkIn)} - {fechaConFormato(reservacion.checkOut)}
                                            </TableCell>
                                            <TableCell align="right">

                                            </TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Button variant="outlined" size="small" onClick={() => actualizarState({ target: { name: "idReservacion", value: reservacion.idReservacion } })}>Seleccionar</Button>
                                                    {/* actualizarState({ name: "idReservacion", value: reservacion.idReservacion }) 
                                                    e => guardarFactura({ idFactura: 2 })
                                                    */}
                                                </Box>
                                            </TableCell>
                                        </TableRow >
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            type="submit"
                            disabled={ValidarFactura()}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Agregar Factura
                        </Button>
                        {/* <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={ValidarFactura()}
                    />
                </div> */}
                    </form>
                </Box>

            </Box>
            {/* <h2>Agregar Factura</h2>

            <legend>Llena todos los campos</legend> */}

            {/* <div className="campo">
                    <label>Fecha de emision:</label>
                    <input
                        type="date"
                        placeholder="Ingrese la fecha de emisión"
                        name="fechaEmision"
                        onChange={actualizarState}
                    />
                </div> */}

            {/* <div className="campo">
                <label>Condicion Venta:</label>
                <input
                    type="text"
                    placeholder="Ingrese la condicion venta"
                    name="condicionVenta"
                    onChange={actualizarState}
                />
            </div> */}
            {/* <div className="campo">
                <label>Medio de Pago:</label>
                <input
                    type="text"
                    placeholder="Ingrese el medio de pago"
                    name="MedioPago"
                    onChange={actualizarState}
                />
            </div> */}
            {/* <div className="campo">
                <label>Total Venta:</label>
                <input
                    type="number"
                    placeholder="Ingrese el total venta"
                    name="totalVenta"
                    onChange={actualizarState}
                />
            </div> */}

            {/* <div className="campo">
                <label>idReservacion:</label>
                <input
                    type="number"
                    placeholder="Ingrese idReservacion"
                    name="idReservacion"
                    onChange={actualizarState}
                />
            </div> */}

            {/* <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={ValidarFactura()}
                    />
                </div> */}


        </Fragment>
    )
}

export default AgregarFactura;