import React,{useEffect, useState, Fragment} from "react";
import clienteAxios from '../../config/axios';
import Habitacion from "./Habitacion";
import {Link} from 'react-router-dom';


function Habitaciones(){

    //Trabajar con useState
    const [habitaciones, guardarhabitaciones] = useState([]);
    //query al api
    const consultarAPI = async() => {
        const habitacionesConsulta = await clienteAxios.get('/habitacion');
        guardarhabitaciones(habitacionesConsulta.data);
    }

    //use effect es similar a componentdidmount y willmount
    useEffect(  ()=>{
        consultarAPI();
    }, [] ); //EL [habitaciones] permite refrescar si hay un cambio, el arreglo vacio evita la iteracion

    return(
        <Fragment>
            <h2>habitaciones</h2>

            <Link to={"/habitacion/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nueva Habitación
            </Link>

            <ul className="listado-clientes">
                {habitaciones.map(habitacion => (
                    <Habitacion 
                        key={habitacion.idHabitacion}
                        habitacion={habitacion}
                    />
                ) )}
            </ul>
        </Fragment>
    )
}

export default Habitaciones;