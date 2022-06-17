import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import {Link} from 'react-router-dom'

function Reservacion(props){
//console.log(props.cliente.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const {idReservacion, cantidadDePersonas, checkIn, checkOut,comentarios, idCliente, cliente} = props.reservacion;
    console.log(props.reservacion);
    console.log(props.reservacion.cliente.nombre);

    //Eliminar Reservacion
    const eliminarReservacion = (id) => {
        
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
                clienteAxios.delete(`/reservacion/${idReservacion}`)
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
                        <p className="nombre">Cantidad de personas: {cantidadDePersonas}</p>
                        <p className="empresa">CheckIn: {checkIn}</p>
                        <p className="empresa">CheckOut:{checkOut}</p>
                        <p className="empresa">Comentarios: {comentarios}</p>
                        <p className="empresa">IdCliente:{idCliente}</p>
                        <p className="empresa">Cliente:{cliente.nombre}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/reservacion/editar/${idReservacion}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Reservacion
                        </Link>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={ () => eliminarReservacion(idReservacion)}>
                                
                            <i className="fas fa-times"></i>
                            Eliminar Reservacion
                        </button>
                    </div>
                </li>
    )
}

export default Reservacion;