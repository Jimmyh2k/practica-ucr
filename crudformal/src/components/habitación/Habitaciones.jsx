import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from '../../config/axios';
import Habitacion from "./Habitacion";
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function Habitaciones() {

    //Trabajar con useState
    const [habitaciones, guardarhabitaciones] = useState([]);
    //query al api
    const consultarAPI = async () => {
        const habitacionesConsulta = await clienteAxios.get('/habitacion');
        guardarhabitaciones(habitacionesConsulta.data);
    }

    //use effect es similar a componentdidmount y willmount
    useEffect(() => {
        consultarAPI();
    }, []); //EL [habitaciones] permite refrescar si hay un cambio, el arreglo vacio evita la iteracion

    return (
        <Fragment>
            <Typography variant="h4" gutterBottom component="h2"
                sx={{
                    mr: 2,
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    paddingTop: '2rem',
                    paddingBottom: '1rem'
                }}
            >
                Habitaciones
            </Typography>

            {/* <Link to={"/habitacion/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nueva Habitación
            </Link> */}


            <Button variant="contained" component={Link} to="/habitacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                Nueva Habitación
            </Button>

            <ul className="listado-clientes">
                {habitaciones.map(habitacion => (
                    <Habitacion
                        key={habitacion.idHabitacion}
                        habitacion={habitacion}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Habitaciones;