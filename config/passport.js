var passport = require("passport");
var passportLocal = require("passport-local").Strategy;

var UserController = require("../controllers/userController");
var User = require("../models/user");

var localconfig = (passport) =>{
passport.use(new passportLocal( async function(nocuenta, contrasena, done){
    await User.findOne({nocuenta : nocuenta}).then(function(result){
        console.log(result);}); }, function (err, user){

    console.log("no cuenta: " + user.nocuenta + "contraseña: " + user.contraseña);
    if(err){return done(err);}

    if(!user){
        return done(null, false, {message: "El usuario no existe"});
    }
    if(!user.decryptPassword(contrasena, user.contraseña)){
        return done(null, false, {message: "Contraseña incorrecta"});
    }

    return done(null, user);
   /* if(user){ //Si el usuario existe
        console.log("El usuario existe");
        var match = User.dencryptPassword(user.contraseña);
        if(match){
            console.log("las contraseñas coinciden");
            return done(null, user);
        }else{
            console.log("las contraseñas no coinciden");
            //Si las contraseñas no coinciden
            return done("err", false);
        }

    }else{ //si el usuario no existe, se regresa false y el mensaje de error
        return done("err", false);
    }*/
}));

//se guardará el id del usuario =>serializador
passport.serializeUser(function(user, done){
    return done(null, user.id);
});

//Deserializacion
passport.deserializeUser(function (id, done){
    User.findById(id, (err, user) => {
        return done(err,user);
    });
});
}
module.exports = localconfig;
