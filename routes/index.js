var express = require('express');
const userController = require('../controllers/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio', 
    link: 'login',
    a: 'Iniciar sesión' 
  });
});

//Ruta para agregar un usuario 
router.post("/", async function(req, res, next){
  const {nocuenta,nombre,apellidos,lic, email, contraseña, confirma_contraseña} = req.body;
  var errors = {title: 'Inicio', link: 'login', a: 'Iniciar sesión', //Se envian lasvariables devista de layout
    "err_nocuenta":"",  //Varibles de errores
    "err_contraseña":"",
    "err_email":"",
    nocuenta, //Datos ingesados por el usuario
    nombre,
    apellidos,
    email
  };
  var count_error = 0; //Varible que sirve para contar cuantos errores tiene el formulario
  //Si las contraseñas no coinciden, se agrega el error al arreglo
  if(contraseña !== confirma_contraseña){
    errors.err_contraseña = "Las contraseñas no coinciden";
    count_error++;
  }
  /*Se busca que no exista algun registro con el numero de cuenta, si la promesa no devuelve nulo, 
  significa que existe y se agrega el error al arreglo
  */
  await userController.findByNocuenta(req,res).then(function(result){
    //Si result, esta definido y es diferente de null
    if(result){
      errors.err_nocuenta = "El numero de cuenta ya esta registrado";
      count_error++;
    }
  });
   /*Se busca que no exista algun registro con el correo electronico, si la promesa no devuelve nulo, 
  significa que existe y se agrega el error al arreglo
  */
  await userController.findByEmail(req,res).then(function(result){
    //Si existe
    if(result){
      errors.err_email = "El email ya esta registrado";
      count_error++;
    } 
  });
  //Si el contador de errores es = 0 se inserta en la base de datos
  if(count_error == 0){
    await userController.save(req,res).then(function(aux_save){
    //console.log(aux_save);
    res.redirect("login/" + aux_save.id);
    });
  }else{
    //console.log("errors: " + JSON.stringify(errors));
    res.render("index", errors);
  }
});
module.exports = router;