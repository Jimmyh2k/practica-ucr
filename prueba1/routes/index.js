const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const habitacionController = require('../controllers/habitacionController');
const reservacionController = require('../controllers/reservacionController');
const usuariosController = require('../controllers/usuariosController');
const auth = require('../middleware/auth');


module.exports = function() {

    //------------------- Rutas de Clientes ------------------- 

    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.agregarCliente);

    //Mostrar los clientes via GET
    router.get('/clientes',auth, clienteController.mostrarClientes);

    //Muestra un cliente por id (buscar)
    router.get('/clientes/:idCliente', clienteController.buscarCliente);

    //Actualzar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //elimina un cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);



    //------------------- Rutas de Habitación ------------------- 
    
    //Agrega nuevos Habitaciones via POST
    router.post('/habitacion', habitacionController.agregarHabitacion);

    //Mostrar los Habitaciones via GET
    router.get('/habitacion', habitacionController.mostrarHabitaciones);

    //Muestra una Habitaciones por id (buscar)
    router.get('/habitacion/:idHabitacion', habitacionController.detallesHabitacion);

    //Elimina una habitación
    router.delete('/habitacion/:idHabitacion', habitacionController.eliminarHabitacion);

    //------------------- Rutas de Reservación -------------------

    //Agrega nuevos Reservaciones via POST
    router.post('/reservacion', reservacionController.agregarReservacion);

    //Mostrar las Reservaciones via GET
    router.get('/reservacion', reservacionController.mostrarReservacion);

    //Muestra una Reservacion por id (buscar)
    router.get('/reservacion/:idReservacion', reservacionController.detallesReservacion);   
     

    //------------------ Rutas de Usuarios -----------------------
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );


    return router;
}