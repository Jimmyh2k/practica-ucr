const Sequelize = require('sequelize');
const db = require('../config/db');

const Usuarios = db.define('usuarios',{
    idUsuario : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },

    correo: {
        type: Sequelize.STRING
    },

    contrasena: {
        type: Sequelize.STRING
    },

    rol: {
        type: Sequelize.STRING
    }
});

module.exports = Usuarios;