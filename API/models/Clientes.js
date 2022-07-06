const Sequelize = require('sequelize');
const db = require('../config/db');

const Clientes = db.define('clientes',{
    idCliente : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre : {
        type: Sequelize.STRING
    },

    correo: {
        type: Sequelize.STRING
    },

    numeroTelefonico: {
        type: Sequelize.INTEGER
    },

    cedula: {
        type: Sequelize.STRING
    },

    tipoCedula: {
        type: Sequelize.STRING
    }
});

module.exports = Clientes;