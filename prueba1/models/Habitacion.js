const Sequelize = require('sequelize');
const db = require('../config/db');

const Habitacion = db.define('habitacion',{
    idHabitacion : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero : {
        type: Sequelize.INTEGER
    },

    camasIndividuales: {
        type: Sequelize.INTEGER
    },

    camasDobles: {
        type: Sequelize.INTEGER
    },

    recomendacionPrecioNacional: {
        type: Sequelize.INTEGER
    },

    recomendacionPrecioExtranjero: {
        type: Sequelize.INTEGER
    }
});

module.exports = Habitacion;