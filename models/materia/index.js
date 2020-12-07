const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var { Schema } = mongoose;

var MateriaSchema = new Schema({
    nombre: {type: String, required: true, max: 50},
    clave: {type: String, required: true, max: 10},
    lic: {type: String, required: true, max: 4},
    semestre: {type: Number, required: true}
});

module.exports = mongoose.model('Materia', MateriaSchema);