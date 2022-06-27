import React from "react";
import { Link } from 'react-router-dom'

function Factura(props){
//console.log(props.factura.nombre); Consultar por manera mas sencilla de usar props
    //Extraer los valores
    const {idFactura, fechaEmision, condicionVenta, MedioPago,totalVenta, idReservacion,reservacion} = props.factura;
    console.log(props.factura.reservacion.cliente.nombre);


    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">Nombre del cliente:{reservacion.cliente.nombre}</p>
                        <p className="empresa">Fecha de Emisión: {fechaEmision}</p>
                        <p className="empresa">Condicion Venta: {condicionVenta}</p>
                        <p className="empresa">Medio de Pago:{MedioPago}</p>
                        <p className="empresa">Total Venta: {totalVenta}</p>
                        <p className="empresa">idReservacion:{idReservacion}</p>
                        <p className="empresa">Habitacion Pagada:{reservacion.habitacion.numero}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/factura/detalle/${idFactura}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Detalles
                        </Link>
                    </div>

        </li>
    )
}

export default Factura;