var mongoose = require('mongoose');
var User = require("../../models/user");

var userController = {};

userController.findByNocuenta = async function(req, res){
    const nocuenta = req.body.nocuenta;
    const auxUser = await User.findOne({nocuenta: nocuenta});
    return auxUser;
}

userController.findByEmail = async function(req, res){
    const email = req.body.email;
    const auxUser = await User.findOne({email: email});
    return auxUser;
}

userController.find = async function(nocuenta){
    const auxUser = await User.findOne({nocuenta: nocuenta});
    //console.log("aux: " + auxUser);
    return auxUser;
}

userController.save = async function(req, res){
    var user = new User( req.body );
    const {nocuenta,nombre,apellidos,lic, email, contraseña, confirma_contraseña} = req.body;
    var rol = 0;
    const auxUser = new User ({nocuenta,nombre,apellidos,lic,email,contraseña, rol});
    auxUser.contraseña =  await auxUser.encryptPassword(contraseña);
    var aux_save = await auxUser.save();
    return aux_save;
};

module.exports = userController;