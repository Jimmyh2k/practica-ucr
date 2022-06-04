import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {Link} from 'react-router-dom'

function Cliente(props){
//console.log(props.cliente.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const {idCliente, nombre, correo, numeroTelefonico,cedula, tipoCedula} = props.cliente;

    //Eliminar Cliente
    const eliminarCliente = (id) => {
        
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
                clienteAxios.delete(`/clientes/${idCliente}`)
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
                        <p className="empresa">Telefono:{numeroTelefonico}</p>
                        <p className="empresa">Cédula: {cedula}</p>
                        <p className="empresa">Tipo Cédula:{tipoCedula}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clientes/editar/${idCliente}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Cliente
                        </Link>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={ () => eliminarCliente(idCliente)}>
                                
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>
    )
}

export default Cliente;