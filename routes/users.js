var express = require('express');
var router = express.Router();
//var passport = require("../config/passport");
var userController = require("../controllers/user");
var materiaController = require("../controllers/materia");
var mongoose = require("mongoose");

router.get('/:id', async function(req, res, next) {
  var cookieID = req.session.nocuenta;
  //console.log("params: " + req.query.id);
  var aux_delete = req.query.action;
  var aux_id_deleted = -1;
  if(aux_delete){
    aux_id_deleted = req.query.id;
  }

  if(cookieID){
    userController.find(cookieID).then(function(result){
      //Se envia el catalogo de materias de acuerdo a licenciatura    
      materiaController.findAll(result.lic).then(function (materias_result){
      //console.log(JSON.stringify(materias_result));
        var vec_mat= [];  
        if(!materias_result){
          vec_mat.push("No hay materias en el catalogo");
        }else{
          for(i=0; i<materias_result.length; i++){
          //  console.log(materias_result[i]);
            vec_mat.push({clave: materias_result[i].clave, nombre: materias_result[i].nombre, semestre:materias_result[i].semestre});
          //console.log(JSON.stringify(vec_mat[i]));
          }
          //ordenar el arreglo por semestre
          vec_mat.sort(function(a,b){
            if (a.semestre > b.semestre) {
              return 1;
            }
            if (a.semestre < b.semestre) {
              return -1;
            }
            return 0;
          });
        }

        //console.log("materias: " + JSON.stringify(materias_result));
        //console.log("res id: " + result.id);
        res.render("users",{ title: 'Inicio', 
          link: '/logout', //enlace
          a: 'Cerrar sesión', // tecto del enlace
          profile_link: "/users/"+req.session.path + "/profile", //Enlace a perfil de usuario
          profile: result.nombre, //se envía elnombre del usuario
          lic: result.lic,  //se envía el rol => sirve para la vista de administrador/usuario
          materias: vec_mat,  //se envía el vector de materias
          path: result.id,
          info: aux_id_deleted
        });
      });
    });
  }
});






 





module.exports = router;
