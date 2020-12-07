var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.destroy;
    //res.cookie.reset;
    console.log(JSON.stringify(req.session));
    res.render('login', { title: 'Inicio', 
          link: '/',    //enlace
          a: 'Registrarse', //texto del enlace 
          h3: "Has cerrado tu sesión" //informacion adicional
      });
  });

  module.exports = router;