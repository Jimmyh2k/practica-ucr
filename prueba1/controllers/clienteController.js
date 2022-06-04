const Clientes = require('../models/Clientes');

//agregar nuevo cliente
exports.agregarCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    }
    catch (error){
        console.log(error);
        next();
    }

}

//Mostrar clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.findAll();
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar cliente por id (busqueda)
exports.buscarCliente = async (req, res, next) => {
    const cliente = await Clientes.findOne({
        where : {
        idCliente: req.params.idCliente
        }
    });

    if(!cliente) {
        res.json({mensaje : 'Ese cliente no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(cliente);
}

//Actualizar el cliente //No funciona F
exports.actualizarCliente = async (req, res, next) => {
    await Clientes.update(
        {
          nombre: req.body.nombre,
          correo: req.body.correo,
          numeroTelefonico: req.body.cedula,
          cedula: req.body.cedula,
          tipoCedula: req.body.tipoCedula
        },
        {
          where: { idCliente: req.params.idCliente }
        }
      ).then(() => res.send("success"));
}

// Elimina un cliente por su ID 
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.destroy({
            where:{
            idCliente : req.params.idCliente }
        });
        res.json({mensaje : 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}