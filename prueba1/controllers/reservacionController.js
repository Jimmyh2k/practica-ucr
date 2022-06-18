const Clientes = require('../models/Clientes');
const Reservacion = require('../models/Reservacion');
const Habitacion = require('../models/Habitacion');

//agregar nuevo cliente
exports.agregarReservacion = async (req, res, next) => {
    const reservacion = new Reservacion(req.body);

    try {
        //almacenar el registro
        await reservacion.save();
        res.json({mensaje: 'Se agrego una nueva reservacion'});
    }
    catch (error){
        console.log(error);
        next();
    }

}

//Mostrar reservaciones
exports.mostrarReservacion = async (req, res, next) => {
    try {
        const reservacion = await Reservacion.findAll({
            include:[
                {model: Habitacion},
                {model: Clientes}
            ]
        });
        res.json(reservacion);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar reservacion por id (busqueda)
exports.detallesReservacion = async (req, res, next) => {
    const reservacion = await Reservacion.findOne({
        where : {
            idReservacion: req.params.idReservacion
        }
      });

    if(!reservacion) {
        res.json({mensaje : 'La reservacion no existe'});
        next()
    }
    // Mostrar la reservacion
    res.json(reservacion);
}