var express = require('express');
var materiaController = require("../controllers/materia");
var userController = require("../controllers/user");
var router = express.Router();

//ruteo para agregar materias
router.post("/add", async function(req, res, next){
    //console.log("url: " + req.originalUrl);
    var {clave, nombre, semestre, lic} = req.body;
    var errors = {title: 'Inicio', link: 'login', a: 'Iniciar sesión', //Se envian lasvariables devista de layout
      "err_cve":"",  //Varibles de errores
      clave, //Datos ingesados por el usuario
      nombre,
      semestre,
      lic
    };
    var count_error = 0; //Varible que sirve para contar cuantos errores tiene el formulario
    //Buscamos la clave de la materia
    await materiaController.find(req.body.clave).then(function(result){
      if(result){
        errors.err_cve = "La clave ya se encuentra registrada";
        count_error++;
      }
    });
    //Si no hubo error en la clave ingresada, inserta la nueva materia
    if(count_error == 0){
      await materiaController.save(req, res).then(function(result){
        //console.log("result materia: " +JSON.stringify(result));
        if(result){
          //console.log("url: " + JSON.stringify(req.session));
          res.redirect(req.body.clave+"?add=success&id=" + req.body.clave);
        }
      });
    }
  });  

  //muestra la materia
  router.get("/:id", async function(req, res, next){
    //obtenemos los parametros en la url
    var info = -1;
    if(req.query.add){
      info = req.query.id;
    }
    //Deserializamos al usuario
    console.log("nocuenta: " + req.session.nocuenta);
    var aux_user = await userController.find(req.session.nocuenta);
    //Se buscan los datos de la materia 
    await materiaController.find(req.params.id).then(function(result){
      if(result){
        res.render("materia",{ title: 'Inicio', 
          link: '/logout', //enlace
          a: 'Cerrar sesión', // tecto del enlace
          profile_link: "/users/"+req.session.path + "/profile", //Enlace a perfil de usuario
          profile: aux_user.nombre, //se envía elnombre del usuario
          rol: result.rol,  //se envía el rol => sirve para la vista de administrador/usuario
          nombre: result.nombre, //info desde base de datos
          clave: result.clave,
          lic: result.lic,
          semestre: result.semestre,
          info: info,
          path: aux_user.id
        });
      }
    });
  });

  router.get("/:id/delete",async function(req, res, next){
    //console.log("id: " + req.params.id);
    await materiaController.delete(req.params.id).then(function (result){
      res.redirect("/users/" + req.session.path + "?delete=success&id=" + req.params.id);
    });
  });

  router.post("/:id/update",async function(req, res, next){
    //console.log("id: " + req.params.id);
    console.log("body: " + JSON.stringify(req.body));
    var {clave, nombre, semestre} = req.body;
    //res.send("ok actualizar");
    await materiaController.update(clave, nombre, semestre).then(function(result){
      console.log("update: "+ result);
      res.redirect("/users/" + req.session.path + "/materia/" + result.clave + "?action=update");
    });
  });

module.exports = router;