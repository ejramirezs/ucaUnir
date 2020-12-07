const mongoose = require("mongoose");

const userDB = "ucaAdmin"; //usuario de la base de datos
const passUDB = "ucaAdmin"; //contraseña
const dbname = "uca" //nombre de la base de datos
const uriDB = "mongodb+srv://"+userDB+":"+passUDB+"@cluster0.d1kto.mongodb.net/"+dbname+"?retryWrites=true&w=majority";

mongoose.connect(uriDB, {useNewUrlParser: true,  useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("EStamos conectados a la base de datos");
});