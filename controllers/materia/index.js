var mongoose = require('mongoose');
var Materia = require("../../models/materia");
var materiaController = {};

materiaController.findAll = async function(lic){
    console.log("lic: " + lic);
    const auxClase = await Materia.find({"lic" : lic});
    //console.log("length: " + auxClase.length + " :: " +JSON.stringify(auxClase));
    return auxClase;
}

materiaController.save = async function(req, res){
    var materia = new Materia( req.body );
    var aux_materia = await materia.save();
    return aux_materia;
}

materiaController.find = async function(clave){
    const materia = await Materia.findOne({clave: clave});
    return materia;
}
materiaController.delete = async function(clave){
    var aux = await Materia.deleteOne({clave: clave});
    return aux;
}
materiaController.update = async function(clave, nombre, semestre){
    var aux = await Materia.findOneAndUpdate({clave: clave},{nombre: nombre, semestre: semestre});
    //console.log("update desde controller: " + JSON.stringify(aux));
    return aux;
}
module.exports = materiaController;