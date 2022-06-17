const Sequelize = require('sequelize');
const db = require('../config/db');

const Reservacion = db.define('reservacion',{
    idReservacion : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidadDePersonas : {
        type: Sequelize.INTEGER
    },

    checkIn: {
        type: Sequelize.DATE
    },

    checkOut: {
        type: Sequelize.DATE
    },

    comentarios: {
        type: Sequelize.STRING
    },

    idCliente: {
        type: Sequelize.INTEGER
    },
    idHabitacion: {
        type: Sequelize.INTEGER
    }
});

module.exports = Reservacion;