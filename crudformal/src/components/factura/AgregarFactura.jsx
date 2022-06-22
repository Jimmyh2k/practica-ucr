import React, {Fragment, useState} from "react";
import clienteAxios from "../../config/axios";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

function AgregarFactura(){

    const navigate = useNavigate();

    //Se guarda primero el factura en el useState
    const[factura,guardarFactura] = useState({
        idFactura:0,
        fechaEmision:new Date(),
        condicionVenta:'', 
        MedioPago:'',
        totalVenta:0,
        idReservacion:0
    });

    //Leer los datos del formulario
    const actualizarState = e => {
            //Almacena lo que el usuario escribe en el state
            guardarFactura({
                ...factura,
                [e.target.name] : e.target.value
            })

    }

    //validar el formulario
    const ValidarFactura = () => {
        //Destructuring
        const {idFactura, fechaEmision, condicionVenta, MedioPago,totalVenta, idReservacion} = factura;

        //Revisa que no haya campos vacíos
        let valido = !condicionVenta.length || !MedioPago.length

         console.log(valido);
        //Si hay algo retorna false al disable, si no retorna true al disable
        return valido;
    }

    //Añade en la rest api un factura nuevo
    const GuardarFactura= e =>{
        e.preventDefault();

        clienteAxios.post('/factura', factura)
        .then(res => {
            console.log(res)
            Swal.fire(
                'Se agregó la factura',
                res.data.mensaje,
                'success'
            )
        });
        navigate('/factura');
    }


    return(
        <Fragment>
            <h2>Agregar Factura</h2>

            <form onSubmit={GuardarFactura}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Fecha de emision:</label>
                    <input 
                        type="date" 
                        placeholder="Ingrese la fecha de emisión" 
                        name="fechaEmision"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Condicion Venta:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese la condicion venta" 
                        name="condicionVenta"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Medio de Pago:</label>
                    <input 
                        type="text" 
                        placeholder="Ingrese el medio de pago" 
                        name="MedioPago"
                        onChange={actualizarState}
                    />
                </div>
                <div className="campo">
                    <label>Total Venta:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese el total venta" 
                        name="totalVenta"
                        onChange={actualizarState}
                    />
                </div> 
                <div className="campo">
                    <label>idReservacion:</label>
                    <input 
                        type="number" 
                        placeholder="Ingrese idReservacion" 
                        name="idReservacion"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Cliente"
                            disabled={ValidarFactura()}
                        />
                </div>

            </form>

        </Fragment>
    )
}

export default AgregarFactura;