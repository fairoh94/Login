const passport = require('passport'); // Requiere el módulo passport para la autenticación
const localStrategy = require('passport-local').Strategy; // Requiere la estrategia local de passport

const User = require('../models/user'); // Requiere el modelo de usuario definido en otro archivo

passport.serializeUser((user, done) => {
    // Serializa el usuario para almacenarlo en la sesión
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // Deserializa el usuario a partir de su ID almacenada en la sesión
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new localStrategy({
    // Configura la estrategia local de passport para el registro
    usernameField: 'email', // Define el campo 'email' como nombre de usuario
    passwordField: 'password', // Define el campo 'password' como contraseña
    passReqToCallback: true // Permite pasar la solicitud al controlador de autenticación
}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email }); // Busca un usuario por su dirección de correo electrónico
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ingresado ya existe.')); // Si el usuario ya existe, retorna un mensaje de error
    } else {
        const newUser = new User(); // Crea un nuevo objeto de usuario
        newUser.email = email; // Establece el email del nuevo usuario
        newUser.password = newUser.encryptPassword(password); // Encripta y establece la contraseña del nuevo usuario
        await newUser.save(); // Guarda el nuevo usuario en la base de datos
        done(null, newUser); // Finaliza la autenticación con el nuevo usuario registrado
    }
}));

passport.use('local-signin', new localStrategy({
    // Configura la estrategia local de passport para el inicio de sesión
    usernameField: 'email', // Define el campo 'email' como nombre de usuario
    passwordField: 'password', // Define el campo 'password' como contraseña
    passReqToCallback: true // Permite pasar la solicitud al controlador de autenticación
}, async (req, email, password, done) => {

    const user = await User.findOne({ email: email }); // Busca un usuario por su dirección de correo electrónico
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Not User Found.')); // Si no se encuentra el usuario, retorna un mensaje de error
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Password Incorrecta')); // Si la contraseña es incorrecta, retorna un mensaje de error
    }
    done(null, user); // Finaliza la autenticación con el usuario encontrado
}));