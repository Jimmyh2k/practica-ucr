const Sequelize = require('sequelize');
const db = require('../config/db');

const Factura = db.define('facturas',{
    idFactura : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fechaEmision: {
        type: Sequelize.DATE
    },

    condicionVenta:{
        type: Sequelize.STRING
    },

    MedioPago:{
        type: Sequelize.STRING
    },

    totalVenta: {
        type: Sequelize.INTEGER
    },
    
    idReservacion : {
        type: Sequelize.INTEGER
    }
});

module.exports = Factura;