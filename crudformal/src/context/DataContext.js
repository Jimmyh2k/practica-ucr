import React, { createContext, useState, useEffect } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

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
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [seleccionDeCliente, setSeleccionDeCliente] = useState(false);
    const [seleccionDeHabitacion, setSeleccionDeHabitacion] = useState(false);
    const [estaBorrado, setEstaBorrado] = useState({
        clienteBorrado: false,
        habitacionBorrada: false,
        reservacionBorrada: false
    });
    const [clientes, setClientes] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);
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

    useEffect(() => {
        if (reservacion.idCliente !== 0) setSeleccionDeCliente(true);
        if (Object.keys(dataForUI.datosDeHabitacion).length !== 0) setSeleccionDeHabitacion(true);
        console.log("Clientes: ", clientes);
        console.log("Habitaciones: ", habitaciones);

    },
        [clientes, habitaciones, reservacion, seleccionDeCliente, seleccionDeHabitacion, dataForUI]);
    return (
        <DataContext.Provider value={{

            checkIn,
            setCheckIn,
            checkOut,
            setCheckOut,
            seleccionDeCliente, setSeleccionDeCliente,
            seleccionDeHabitacion, setSeleccionDeHabitacion,
            reservacion,
            actualizarReservacion,
            dataForUI,
            clientes,
            setClientes,
            estaBorrado, setEstaBorrado,
            habitaciones, setHabitaciones
        }}>
            {children}
        </DataContext.Provider>
    )
}