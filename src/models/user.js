const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con la base de datos MongoDB
const bcrypt = require('bcrypt-nodejs'); // Importa el módulo bcrypt para encriptar contraseñas
const { Schema } = mongoose; // Extrae el objeto Schema del módulo mongoose

const userSchema = new Schema({
    email: String, // Define un campo 'email' de tipo String en el esquema del usuario
    password: String // Define un campo 'password' de tipo String en el esquema del usuario
});

userSchema.methods.encryptPassword = (password) => {
    // Agrega un método 'encryptPassword' al esquema del usuario
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // Encripta la contraseña usando bcrypt
};

userSchema.methods.comparePassword = function (password) {
    // Agrega un método 'comparePassword' al esquema del usuario
    return bcrypt.compareSync(password, this.password); // Compara una contraseña proporcionada con la contraseña almacenada en el esquema del usuario
};

module.exports = mongoose.model('users', userSchema);
// Exporta el modelo 'users' utilizando el esquema definido, para poder utilizarlo en otras partes de la aplicación