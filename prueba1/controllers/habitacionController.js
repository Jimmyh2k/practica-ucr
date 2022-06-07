const Habitacion = require('../models/Habitacion');

//agrega nueva habitación
exports.agregarHabitacion = async (req, res, next) => {
    const habitacion = new Habitacion(req.body);

    try {
        //almacenar el registro
        await habitacion.save();
        res.json({mensaje: 'Se agrego la nueva habitación'});
    }
    catch (error){
        console.log(error);
        next();
    }

}

//Mostrar habitación
exports.mostrarHabitaciones = async (req, res, next) => {
    try {
        const habitacion = await Habitacion.findAll();
        res.json(habitacion);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar habitación por id (detalles)
exports.detallesHabitacion = async (req, res, next) => {
    const habitacion = await Habitacion.findOne({
        where : {
         idHabitacion: req.params.idHabitacion
        }
      });

    if(!habitacion) {
        res.json({mensaje : 'La habitación no existe'});
        next()
    }
    // Mostrar la habitacion
    res.json(habitacion);
}

//Eliminar Habitación
exports.eliminarHabitacion = async (req, res, next) => {
    try {
        await Habitacion.destroy({
            where:{
            idHabitacion : req.params.idHabitacion }
        });
        res.json({mensaje : 'La habitación se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarHabitacion = async (req, res, next) => {
    await Habitacion.update(
        {
          numero: req.body.numero,
          camasIndividuales: req.body.camasIndividuales,
          camasDobles: req.body.camasDobles,
          recomendacionPrecioNacional: req.body.recomendacionPrecioNacional,
          recomendacionPrecioExtranjero: req.body.recomendacionPrecioExtranjero
        },
        {
          where: { idHabitacion: req.params.idHabitacion }
        }
      ).then(() => res.send("success"));
}