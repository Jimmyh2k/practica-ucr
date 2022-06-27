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
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [seleccionDeCliente, setSeleccionDeCliente] = useState(false);
    const [seleccionDeHabitacion, setSeleccionDeHabitacion] = useState(false);
    const listaDeClientes = [
        { id: 1, nombre: 'Jon Snow', cedula: 604560017 },
        { id: 2, nombre: 'Cersei Lannister', cedula: 123446789 },
        { id: 3, nombre: 'Jaime Lannister', cedula: 123455789 },
        { id: 4, nombre: 'Arya Stark', cedula: 123456779 },
        { id: 5, nombre: 'Daenerys Targaryen', cedula: 123456789 },
        { id: 6, nombre: '- Melisandre', cedula: 123459789 },
        { id: 7, nombre: 'Ferrara Clifford', cedula: 103456789 },
        { id: 8, nombre: 'Rossini Frances', cedula: 122456789 },
        { id: 9, nombre: 'Harvey Roxie', cedula: 123458789 },
        { id: 10, nombre: 'Harvey Roxie', cedula: 123358789 },
        { id: 11, nombre: 'Harvey Roxie', cedula: 129458789 },
        { id: 12, nombre: 'Harvey Roxie', cedula: 12358789 },
    ];
    const [clientes, setClientes] = useState([]);
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
        console.log(reservacion);

    },
        [clientes, reservacion, seleccionDeCliente, seleccionDeHabitacion, dataForUI]);
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
            dataForUI,
            listaDeClientes,
            clientes,
            setClientes
        }}>
            {children}
        </FacturaContext.Provider>
    )
}