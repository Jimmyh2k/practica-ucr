import React, { createContext, useState, useEffect } from 'react'

export const FacturaContext = createContext();

export const FacturaProvider = ({ children }) => {

    const [reservacion, setReservacion] = useState({
        cantidadDePersonas: 0,
        checkIn: new Date(),
        checkOut: new Date(),
        comentarios: '',
        idCliente: 0,
        idHabitacion: 0,
    });
    const [dataForUI, setDataForUI] = useState({
        datosDelCliente: {},
        datosDeHabitacion: {}
    })

    //Leer los datos del formulario
    const actualizarReservacion = e => {
        //Almacena lo que el usuario escribe en el state
        if (e.dataForUI) {
            setDataForUI({
                ...dataForUI,
                [e.dataForUI.name]: e.dataForUI.value
            })
        }
        setReservacion({
            ...reservacion,
            [e.name]: e.value
        })

    }

    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());


    const [seleccionDeCliente, setSeleccionDeCliente] = useState(false);

    const [seleccionDeHabitacion, setSeleccionDeHabitacion] = useState(false);
    useEffect(() => {
        if (Object.keys(dataForUI.datosDelCliente).length !== 0) setSeleccionDeCliente(true);
        if (Object.keys(dataForUI.datosDeHabitacion).length !== 0) setSeleccionDeHabitacion(true);
        // Object.keys(dataForUI.datosDeHabitacion).length === 0 ? setSeleccionDeHabitacion(false) : setSeleccionDeHabitacion(true);

        console.log(seleccionDeCliente, seleccionDeHabitacion);
        console.log(reservacion);
        console.log(dataForUI);

    },
        [reservacion, seleccionDeCliente, seleccionDeHabitacion, dataForUI]);
    return (
        <FacturaContext.Provider value={{

            checkIn,
            setCheckIn,
            checkOut,
            setCheckOut,

            seleccionDeCliente, setSeleccionDeCliente,
            seleccionDeHabitacion, setSeleccionDeHabitacion,
            reservacion,
            actualizarReservacion,
            dataForUI
        }}>
            {children}
        </FacturaContext.Provider>
    )
}