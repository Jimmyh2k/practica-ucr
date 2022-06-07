const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');


exports.registrarUsuario = async (req,res) => {

    //Leer datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.contrasena = await bcrypt.hash(req.body.contrasena, 12);
    try{
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'});
    }catch (error){
        console.log('error');
        res.json({mensaje: 'Hubo un error'});
    }
}

exports.autenticarUsuario = async (req, res, next) => {

    const usuario = await Usuarios.findOne({
        where : {
        correo: req.body.correo
        }
    });

    //Verificar si el usuario existe (por medio del correo)
    if(!usuario) {
        await res.status(401).json({mensaje: 'El usuario no existe'})
        next();
    }else{
    // El usuario existe, verificar si es el password correcto

        if(!bcrypt.compareSync(req.body.contrasena, usuario.contrasena)){
            //El password es incorrecto
            await res.status(401).json({mensaje: 'Contraseña Incorrecta'});
            next();
        }
        else{
            //Password correcto, se crea un token para que vuelva a iniciar sesion posteriormente

            const token = jwt.sign({
                correo : usuario.correo, 
                nombre: usuario.nombre, 
                idUsuario : usuario.idUsuario
            }, 
            'LLAVESECRETA', 
            {
                expiresIn : '5h'
            }); 

            // retornar el TOKEN
            res.json({ token });

        }

    }
}

//Mostrar Usuarios
exports.mostrarUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar cliente por id (busqueda)
exports.buscarUsuario = async (req, res, next) => {
    const usuario = await Usuarios.findOne({
        where : {
        idUsuario: req.params.idUsuario
        }
    });

    if(!usuario) {
        res.json({mensaje : 'Ese usuario no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(usuario);
}


exports.actualizarUsuario = async (req, res, next) => {
    await Usuarios.update(
        {
          nombre: req.body.nombre,
          correo: req.body.correo,
          contrasena: await bcrypt.hash(req.body.contrasena, 12),
          rol: req.body.rol
        },
        {
          where: { idUsuario: req.params.idUsuario }
        }
      ).then(() => res.send("success"));
}

// Elimina un cliente por su ID 
exports.eliminarUsuario = async (req, res, next) => {
    try {
        await Usuarios.destroy({
            where:{
            idUsuario : req.params.idUsuario }
        });
        res.json({mensaje : 'El usuario se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}