//Dependencias de librerias
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var passport = require("passport");
//var passportLocal = require("passport-local").Strategy;
var session = require("express-session");



//Rutas de paginas web
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/login");
var materiaRouter = require("./routes/materia");
var logoutRouter = require("./routes/logout");

//Inicializacion de la aplicacion
var app = express();
require("./database");


// se declaran las vistas y el administrador = pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: "userAccessControl",
  resave: true, //en cada peticion se va volver a guardar aunque no se modifique
  saveUninitialized: true //Si inicializamos una sesion y no se guarda nada, aun asi se guarda
  //cookie: {secure: true}
}));

//middlewares
//require("./config/passport")(passport);
//app.use(passport.initialize());
//app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Ruteo 
app.use('/', indexRouter); //Cuando la url == / (raiz), se mostrará el index
app.use('/users', usersRouter); 
app.use('/users/:id', usersRouter);
app.use("/login", loginRouter); //Cuando la url == /login, se mostrará el formulario de logeo
app.use("/users/:id/materia", materiaRouter);
//app.use("/users/:id/materia/:id/delete", materiaRouter);
app.use("/logout", logoutRouter);


// cualquier pagina no encontrada, caerá en error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;