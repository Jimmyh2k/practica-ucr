const Clientes = require('../models/Clientes');
const Factura = require('../models/Factura');
const Habitacion = require('../models/Habitacion');
const Reservacion = require('../models/Reservacion');

//agregar nueva factura
exports.agregarFacturas = async (req, res, next) => {
    const factura = new Factura(req.body);

    try {
        //almacenar el registro
        await factura.save();
        res.json({mensaje: 'Se agrego la nueva factura'});
    }
    catch (error){
        console.log(error);
        next();
    }

}

//Mostrar facturas
exports.mostrarFacturas = async (req, res, next) => {
    try {
        const facturas = await Factura.findAll({
            include: {model: Reservacion,
                include:[
                    {model: Habitacion},
                    {model: Clientes}
                ] }
        });
        res.json(facturas);
    } catch (error) {
        console.log(error);
        next();
    }
}