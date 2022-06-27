const Sequelize = require('sequelize');

const db = new Sequelize('pruebacliente', 'root', '12345', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: 0,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;