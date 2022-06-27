import React,{useEffect, useState, Fragment, useContext} from "react";
import clienteAxios from '../../config/axios';
import Factura from "./Factura";
import {Link, useNavigate} from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Facturas(){

    const navigate = useNavigate();

    //Trabajar con useState
    const [facturas, guardarfacturas] = useState([]);

      // utilizar valores del context
      const [auth, guardarAuth ] = useContext( CRMContext );

        // use effect es similar a componentdidmount y willmount
        useEffect( () => {

            if(auth.token !== '') {
                // Query a la API
                const consultarAPI = async () => {
                    try {
                        const facturaConsulta = await clienteAxios.get('/factura', {
                            headers: {
                                Authorization : `Bearer ${auth.token}`
                            }
                        });
        
                        // colocar el resultado en el state
                        guardarfacturas(facturaConsulta.data);
    
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
        }, [] ); //[facturas] es para refrescar buscar otra manera
    
    
        // Si el state esta como false
        if(!auth.auth) {
            navigate('/iniciar-sesion'); //REVISAR
        }

    return(
        <Fragment>
            <h2>Facturas</h2>

            <Link to={"/factura/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nueva factura
            </Link>

            <ul className="listado-clientes">
                {facturas.map(factura => (
                    <Factura 
                        key={factura.idFactura}
                        factura={factura}
                    />
                ) )}
            </ul>
        </Fragment>
    )
}

export default Facturas;