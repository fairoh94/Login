//Este index arranca nuestro proyecto.
const express = require ('express'); //Nos permite escribir y ejecutar el servidor
const engine = require ('ejs-mate'); // Para crear nuestras plantillas (Es un motor)
const path = require ('path'); // Este modulo para unir directorios o hacer rutas multiplataforma
const morgan = require ('morgan'); //Para ver
const passport = require ('passport');
const session = require ('express-session');
const flash = require('connect-flash');


//Inicializaciones
const app = express(); //Le digo que se ejecute
require('./database');
require('./passport/local-auth');


//settingss
app.set('views', path.join(__dirname, 'views')); //Para que nodejs conozca la rutas de mi vistas
app.engine('ejs', engine); // Aqui decimos para que lo utilice y configurarlo
app.set('view engine', 'ejs'); // Aqui establecemos el motor de plantillas
app.set('port', process.env.PORT || 3000); //Establecer el puerto
                //utiliza el puerto del sistema operativo o el 3000

//middlewares -> funciones que se ejecutan antes de que pasen a las rutas.
app.use(morgan('dev')); // Usa morgan y muestrame mensaje en consola,
                        //las peticiones que se hacen a nuestro servidor

app.use(express.urlencoded({extended: false})); //Recibir datos desde el cliente
                                         //Con false cancelo imagenes, solo pido datos de un formulario
app.use(session({
    secret:'myonlyesession', // Clave secreta utilizada para cifrar la información de la sesión
    resave: false, // Indica si se debe volver a guardar la sesión en el almacén, incluso si no ha cambiado
    saveUninitialized: false // Indica si se debe guardar una sesión sin inicializarla primero
}));
app.use(flash()); // Middleware que permite almacenar mensajes flash en la sesión
app.use(passport.initialize()); // Inicializa el módulo passport para la autenticación
app.use(passport.session()); // Configura el uso de sesiones de passport para persistir la autenticación

app.use((req, res, next) => {
    // Middleware personalizado para establecer variables locales en la aplicación
    app.locals.signupMessage = req.flash('signupMessage'); // Almacena el mensaje flash 'signupMessage' en una variable local
    app.locals.signinMessage = req.flash('signinMessage'); // Almacena el mensaje flash 'signinMessage' en una variable local
    app.locals.user = req.user; // Almacena el usuario autenticado en una variable local
    next(); // Pasa al siguiente middleware en la cadena de middleware
});


//Routes
//Express usa esta rota cada vez que el usuario ingrese  a la ruta principal.
app.use('/', require('./routes/index'));


//Iniciar el servidor
//Aplicaciones escuchen el siguiente puerto:
app.listen(app.get('port'), () =>{
    console.log('Server on Port', app.get('port')); //
})