import React, { createContext, useState, useEffect } from 'react'

export const FacturaContext = createContext();

export const FacturaProvider = ({ children }) => {

    // const [cliente, guardarCliente] = useState({
    //     nombre: '',
    //     correo: '',
    //     numeroTelefonico: '',
    //     cedula: '',
    //     tipoCedula: ''
    // });

    // //Leer los datos del formulario
    // const actualizarState = e => {
    //     //Almacena lo que el usuario escribe en el state
    //     guardarCliente({
    //         ...cliente,
    //         [e.target.name]: e.target.value
    //     })

    // }
    const [cantidadDePersonas, setCantidadDePersonas] = useState(0);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [clienteReservacion, setClienteReservacion] = useState({});
    const [habitacionReservacion, setHabitacionReservacion] = useState({});
    const [seleccionDeCliente, setSeleccionDeCliente] = useState(false);
    const [seleccionDeHabitacion, setSeleccionDeHabitacion] = useState(false);
    const [datosLlenados, setDatosLlenados] = useState({});
    useEffect(() => {
        Object.keys(clienteReservacion).length === 0 ? setSeleccionDeCliente(false) : setSeleccionDeCliente(true);
        Object.keys(habitacionReservacion).length === 0 ? setSeleccionDeHabitacion(false) : setSeleccionDeHabitacion(true);

        console.log(cantidadDePersonas, seleccionDeCliente);
        console.log(checkIn);
        console.log(checkOut);
        console.log(clienteReservacion);

    },
        [clienteReservacion, cantidadDePersonas, checkIn, checkOut]);
    return (
        <FacturaContext.Provider value={{
            cantidadDePersonas,
            setCantidadDePersonas,
            checkIn,
            setCheckIn,
            checkOut,
            setCheckOut,
            clienteReservacion, setClienteReservacion,
            habitacionReservacion, setHabitacionReservacion,
            seleccionDeCliente, setSeleccionDeCliente,
            seleccionDeHabitacion, setSeleccionDeHabitacion
        }}>
            {children}
        </FacturaContext.Provider>
    )
}