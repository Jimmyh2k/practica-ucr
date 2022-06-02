import React,{useEffect, useState, Fragment, useContext} from "react";
import clienteAxios from '../../config/axios';
import Usuario from "./Usuario";
import {Link, useNavigate} from 'react-router-dom';

// import el Context
import { CRMContext } from '../../context/CRMContext';


function Usuarios(){

    const navigate = useNavigate();

    //Trabajar con useState
    const [usuarios, guardarusuarios] = useState([]);

      // utilizar valores del context
      const [auth, guardarAuth ] = useContext( CRMContext );

        // use effect es similar a componentdidmount y willmount
        useEffect( () => {

            if(auth.token !== '') {
                // Query a la API
                const consultarAPI = async () => {
                    try {
                        const usuariosConsulta = await clienteAxios.get('/usuarios', {
                            headers: {
                                Authorization : `Bearer ${auth.token}`
                            }
                        });
        
                        // colocar el resultado en el state
                        guardarusuarios(usuariosConsulta.data);
    
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
        }, [] ); //[usuarios] es para refrescar buscar otra manera
    
    
        // Si el state esta como false
        if(!auth.auth) {
            navigate('/iniciar-sesion'); //REVISAR
        }

    return(
        <Fragment>
            <h2>Usuarios</h2>

            <Link to={"/usuario/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Usuario
            </Link>

            <ul className="listado-clientes">
                {usuarios.map(usuario => (
                    <Usuario 
                        key={usuario.idUsuario}
                        usuario={usuario}
                    />
                ) )}
            </ul>
        </Fragment>
    )
}

export default Usuarios;