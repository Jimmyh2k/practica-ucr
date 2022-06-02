const express = require('express');
const routes = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');

//Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//Importa el modelo para crear las tablas por default
require('./models/Clientes');
require('./models/Habitacion');
require('./models/Usuarios');

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