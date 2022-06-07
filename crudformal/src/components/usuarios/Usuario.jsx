import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {Link} from 'react-router-dom'

function Usuario(props){
//console.log(props.usuario.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const {idUsuario, nombre, correo, contrasena,rol} = props.usuario;

    //Eliminar usuario
    const eliminarUsuario = (id) => {
        
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "¡Los cambios no se pueden revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/usuarios/${idUsuario}`)
                .then(res => {
                    Swal.fire(  
                        'Eliminado', 
                        res.data.mensaje, 
                        'success'
                    );
                });
            }
          })
    }

    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">Nombre: {nombre}</p>
                        <p className="empresa">Correo: {correo}</p>
                        <p className="empresa">rol:{rol}</p>
                    </div>
                    <div className="acciones">
                    <Link to={`/usuario/editar/${idUsuario}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={ () => eliminarUsuario(idUsuario)}>
                                
                            <i className="fas fa-times"></i>
                            Eliminar Usuario
                        </button>
                    </div>
                </li>
    )
}

export default Usuario;