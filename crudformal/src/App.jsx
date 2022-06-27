import React, { useContext, useState } from "react";

//Layout
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Componentes
import Clientes from "./components/clientes/Clientes";
import AgregarCliente from "./components/clientes/AgregarCliente";
import EditarCliente from "./components/clientes/EditarClientes";
import DetallesCliente from "./components/clientes/DetallesCliente";
import Habitaciones from "./components/habitación/Habitaciones";
import AgregarHabitacion from "./components/habitación/AgregarHabitacion";
import EditarHabitacion from "./components/habitación/EditarHabitacion";
import Reservacion from "./components/reservación/Reservacion";

import Reservaciones from "./components/reservación/Reservaciones";
import AgregarReservacion from "./components/reservación/AgregarReservacion";
import DetallesReservacion from "./components/reservación/DetallesReservacion";
import Usuarios from "./components/usuarios/Usuarios";
import { CssBaseline } from "@mui/material";
import AgregarUsuario from "./components/usuarios/AgregarUsuario";
import EditarUsuario from "./components/usuarios/EditarUsuario";
import Facturas from "./components/factura/Facturas";
import AgregarFactura from "./components/factura/AgregarFactura";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import DetallesFactura from "./components/factura/DetalleFactura";


import Login from "./components/auth/Login";
import { CRMContext, CRMProvider } from "./context/CRMContext";
import { DataProvider } from './context/DataContext';


function App() {

  //Utilizar el context
  const [auth, guardarAuth] = useContext(CRMContext);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#9000B3',
      },
      secondary: {
        main: '#D14465',
      },
    },
  });

  return (

    <Router>
      <CssBaseline />
      <div className="App">
        <CRMProvider value={[auth, guardarAuth]}>
          <DataProvider>
            <ThemeProvider theme={theme}>
              {/* <Header></Header> */}
              <div className="grid contenedor contenido-principal">
                <Navegacion></Navegacion>

                <main className="caja-contenido col-9">
                  <Routes>
                    <Route exact path="/" element={<Clientes />} />

                    <Route exact path="/clientes/editar/:id" element={<EditarCliente />} />

                <Route exact path="/clientes/detalle/:id" element={<DetallesCliente />} />

                <Route exact path="/habitacion" element={<Habitaciones />} />

                    <Route exact path="/clientes/nuevo" element={<AgregarCliente />} />

                    <Route exact path="/habitacion/editar/:id" element={<EditarHabitacion />} />

                    {/* <Route exact path="/Reservacion" element={<Reservaciones />} /> */}

                    <Route exact path="/reservacion" element={<Reservaciones />} />

                    <Route exact path="/reservacion/nuevo" element={<AgregarReservacion />} />

                    <Route exact path="/habitacion/nuevo" element={<AgregarHabitacion />} />

                    <Route exact path="/iniciar-sesion" element={<Login />} />

                    <Route exact path="/usuario/nuevo" element={<AgregarUsuario />} />

                    <Route exact path="/usuario/editar/:id" element={<EditarUsuario />} />

                    <Route exact path="/usuario" element={<Usuarios />} />

                    <Route exact path="/factura" element={<Facturas />} />

                    <Route exact path="/factura/nuevo" element={<AgregarFactura />} />

                  </Routes>

                </main>
              </div>
            </ThemeProvider>
          </DataProvider>
        </CRMProvider>
      </div>
    </Router>
  );
}

export default App;
