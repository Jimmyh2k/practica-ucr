import React,{useEffect, useState, Fragment, useContext} from "react";
import clienteAxios from '../../config/axios';
import Cliente from "./Cliente";
import {Link, useNavigate} from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Clientes(){

    const navigate = useNavigate();

    //Trabajar con useState
    const [clientes, guardarclientes] = useState([]);

      // utilizar valores del context
      const [auth, guardarAuth ] = useContext( CRMContext );

        // use effect es similar a componentdidmount y willmount
        useEffect( () => {

            if(auth.token !== '') {
                // Query a la API
                const consultarAPI = async () => {
                    try {
                        const clientesConsulta = await clienteAxios.get('/clientes', {
                            headers: {
                                Authorization : `Bearer ${auth.token}`
                            }
                        });
        
                        // colocar el resultado en el state
                        guardarclientes(clientesConsulta.data);
    
                    } catch (error) {
                        // Error con authorizacion
                        if(error.response.status === 500) {
                            navigate('/iniciar-sesion');
                        }
                    }
                }
                consultarAPI();
            } else {
                navigate('/iniciar-sesion');
            }
        }, [] ); //[clientes] es para refrescar buscar otra manera
    
    
        // Si el state esta como false
        if(!auth.auth) {
            navigate('/iniciar-sesion'); //REVISAR
        }

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente.idCliente}
                        cliente={cliente}
                    />
                ) )}
            </ul>
        </Fragment>
    )
}

export default Clientes;