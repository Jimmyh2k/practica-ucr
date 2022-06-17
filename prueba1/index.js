const express = require('express');
const routes = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');
const Reservacion = require('./models/Reservacion');
const Clientes = require('./models/Clientes');
const Habitacion = require('./models/Habitacion');

//Importa el modelo para crear las tablas por default
require('./models/Clientes');
require('./models/Habitacion');
require('./models/Usuarios');
require('./models/Reservacion');

 //Asosiaciones
  Clientes.hasOne(Reservacion,{foreignKey: "idCliente"});
  Reservacion.belongsTo(Clientes,{foreignKey: "idCliente"});

  Habitacion.hasOne(Reservacion,{foreignKey: "idHabitacion"});
  Reservacion.belongsTo(Habitacion,{foreignKey: "idHabitacion"});

db.sync()  //.authenticate sirve solo para conectar, .sync sirve para crear las tablas
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

//Crear el servidor
const app = express();

//habilitar body parser (consultar nueva forma)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Habilita cors
app.use(cors());

//rutas
app.use('/', routes());

//puerto
app.listen('5000');