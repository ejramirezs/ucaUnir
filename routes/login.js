var express = require('express');
const passport = require('passport');
var router = express.Router();

var UserController = require("../controllers/user");
var User = require("../models/user");

/* GET login page */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio', 
        link: '/',
        a: 'Registrarse' 
    });
});

router.get('/:id', function(req, res, next) {
  res.render('login', { title: 'Inicio', 
        link: '/',
        a: 'Registrarse',
        h3: "¡Registro exitoso! Por favor, inicia sesión" 
    });
});

router.post('/', async function(req, res){
  const contraseña = req.body.contrasena;
  await UserController.findByNocuenta(req,res).then(function(result){
    //Si result, esta definido y es diferente de null
    if(!result){
      //errors.err_nocuenta = "El numero de cuenta no esta registrado";
      //count_error++;
    }else{
      var user = new User(result);
      user.decryptPassword(contraseña, user.contraseña).then(function (result){
        console.log("result: " +result);     
        if(result){
              
              req.session.cookie.maxAge = 3600000; //la sesion durará una hora
              req.session.nocuenta = user.nocuenta;//se crean las variables en la sesion
              req.session.path = user.id;
              //console.log("nocuenta: " + req.session.nocuenta);
              //console.log("path: " + req.session.path);
              res.redirect("users/" + user.id);
             }
            });
 
    }
  });
  
  
});






module.exports = router;
