const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var { Schema } = mongoose;

var UserSchema = new Schema({
    nocuenta: {type: Number, required: true},
    nombre: {type: String, required: true, max: 50},
    apellidos: {type: String, required: true, max: 100},
    lic: {type: Number, required: true, max: 4},
    email: {type: String, required: true, max: 50},
    contraseña: {type: String, required: true},
    rol: {type: Number, required: true, max: 4}
});

UserSchema.methods.encryptPassword = async function (password){
    const salt = await bcrypt.genSalt(10);
    const hash  = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.decryptPassword = async function (password, hash){
    return await bcrypt.compare(password, hash);  
};

module.exports = mongoose.model('User', UserSchema);