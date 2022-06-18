import React, { useEffect, useState, Fragment, useContext } from "react";
import { Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import clienteAxios from '../../config/axios';
import Reservacion from "./Reservacion";
// import el Context
import { CRMContext } from '../../context/CRMContext';


function Reservaciones() {



    const navigate = useNavigate();

    //Trabajar con useState
    const [reservaciones, guardarreservaciones] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    // use effect es similar a componentdidmount y willmount
    useEffect(() => {

        if (auth.token !== '') {
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const reservacionesConsulta = await clienteAxios.get('/reservacion', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });

                    // colocar el resultado en el state
                    guardarreservaciones(reservacionesConsulta.data);

                } catch (error) {
                    // Error con authorizacion
                    if (error.response.status === 500) {
                        navigate('/iniciar-sesion');
                    }
                }
            }
            consultarAPI();
        } else {
            navigate('/iniciar-sesion');
        }
    }, []); //[clientes] es para refrescar buscar otra manera


    // Si el state esta como false
    if (!auth.auth) {
        navigate('/iniciar-sesion'); //REVISAR
    }

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
                Reservaciones
            </Typography>

            <Button sx={{ alignSelf: 'flex-start' }} variant="contained" component={Link} to="/reservacion/nuevo" color="secondary" startIcon={<AddCircleOutlinedIcon />}>
                Nueva reservacion
            </Button>
            <ul className="listado-clientes">
                {reservaciones.map(reservacion => (
                    <Reservacion
                        key={reservacion.idReservacion}
                        reservacion={reservacion}
                    />
                ))}
            </ul>
        </Fragment >
        // import React,{useEffect, useState, Fragment, useContext} from "react";
        // import clienteAxios from '../../config/axios';
        // import Reservacion from "./Reservacion";
        // import {Link, useNavigate} from 'react-router-dom';

        // // import el Context
        // import { CRMContext } from '../../context/CRMContext';


        // function Reservaciones(){

        //     const navigate = useNavigate();

        //     //Trabajar con useState
        //     const [reservaciones, guardarreservaciones] = useState([]);

        //       // utilizar valores del context
        //       const [auth, guardarAuth ] = useContext( CRMContext );

        //         // use effect es similar a componentdidmount y willmount
        //         useEffect( () => {

        //             if(auth.token !== '') {
        //                 // Query a la API
        //                 const consultarAPI = async () => {
        //                     try {
        //                         const reservacionesConsulta = await clienteAxios.get('/reservacion', {
        //                             headers: {
        //                                 Authorization : `Bearer ${auth.token}`
        //                             }
        //                         });

        //                         // colocar el resultado en el state
        //                         guardarreservaciones(reservacionesConsulta.data);

        //                     } catch (error) {
        //                         // Error con authorizacion
        //                         if(error.response.status === 500) {
        //                             navigate('/iniciar-sesion');
        //                         }
        //                     }
        //                 }
        //                 consultarAPI();
        //             } else {
        //                 navigate('/iniciar-sesion');
        //             }
        //         }, [] ); //[clientes] es para refrescar buscar otra manera


        //         // Si el state esta como false
        //         if(!auth.auth) {
        //             navigate('/iniciar-sesion'); //REVISAR
        //         }

        //     return(
        //         <Fragment>
        //             <h2>Reservaciones</h2>

        //             <Link to={"/reservacion/nuevo"} className="btn btn-verde nvo-cliente"> 
        //                 <i className="fas fa-plus-circle"></i>
        //                 Nueva Reservacion
        //             </Link>

        //             <ul className="listado-clientes">
        //                 {reservaciones.map(reservacion => (
        //                     <Reservacion 
        //                         key={reservacion.idReservacion}
        //                         reservacion={reservacion}
        //                     />
        //                 ) )}
        //             </ul>
        //         </Fragment>
        //    
    )
}

export default Reservaciones;