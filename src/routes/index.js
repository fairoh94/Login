const express = require('express'); //Para usar el metodo router y definir las rutas del servidor.
const router = express.Router();
const passport = require ('passport');


const Alumno = require('../models/alumno');
const Carrera = require('../models/carrera');

//request, response y next -> manejador de peticiones.
//.get le damos una ventana al usuario para pedirl sus datos.
//.post sirve para escuchar los datos de usuario y mandarla.

//HOME -> Indicamos que ruta visitara el usuario '/' apenas ingrese a nuestra aplicacion
router.get('/', (req, res, next) => {
    res.render('signin');
});


router.post('/buscar', (req, res, next) => {
  const { nombre, apellidoPaterno, apellidoMaterno, id, carrera, estatus } = req.body;

  const query = {};

  if (nombre) {
    query.nombre = nombre;
  }

  if (apellidoPaterno) {
    query.apellidoPaterno = apellidoPaterno;
  }

  if (apellidoMaterno) {
    query.apellidoMaterno = apellidoMaterno;
  }

  if (carrera) {
    query.carrera = carrera;
  }

  if (estatus) {
    query.estatus = estatus;
  }

  Carrera.find()
    .then(carreras => {
      Alumno.find(query)
        .populate('carrera')
        .then(alumnos => {
          res.render('buscar', { alumnos, carreras });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/fail');
        });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});


//Editar un Alumno y Actualizarlo//
router.get('/editalumno/:alumnoId', (req, res, next) => {
  const alumnoId = req.params.alumnoId;

  Alumno.findById(alumnoId)
    .then(alumno => {
      if (!alumno) {
        res.redirect('/consultaralumno');
      } else {
        Carrera.find()
          .then(carreras => {
            res.render('editalumno', { alumnoId: alumnoId, alumno: alumno, carreras: carreras });
          })
          .catch(err => {
            console.log(err);
            res.redirect('/fail');
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});


router.post('/actualizaralumno', (req, res, next) => {
  const alumnoId = req.body.alumnoId;
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, estatus, email, telefono, direccion } = req.body;

  // Lógica para actualizar los datos del alumno utilizando el alumnoId
  Alumno.findByIdAndUpdate(alumnoId, {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    carrera,
    estatus,
    email,
    telefono,
    direccion
  })
    .then(() => {
      res.redirect('/consultaralumno');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});

router.post('/deletealumno', (req, res, next) => {
  const alumnoId = req.body.alumnoId;
  
  Alumno.findByIdAndRemove(alumnoId)
    .then(() => {
      res.redirect('/consultaralumno');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});



//ADD CARRERA
router.get('/addcarrera', (req, res, next) => {
  res.render('addcarrera');
});

router.post('/addcarrera', (req, res, next) => {
  const { carrera, descripcion, departamento } = req.body;

  const newCarrera = new Carrera({
    carrera,
    descripcion,
    departamento
  });

  newCarrera.save()
    .then(() => {
      res.redirect('/profile');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});

//Consultar y eliminar una carrera
router.get('/consultarcarrera', (req, res, next) => {
  Carrera.find()
    .then(carreras => {
      res.render('consultarcarrera', { carreras: carreras });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});

router.post('/deletecarrera', (req, res, next) => {
  const carreraId = req.body.carreraId;

  Carrera.findByIdAndRemove(carreraId)
    .then(() => {
      Alumno.updateMany({ carrera: carreraId }, { $unset: { carrera: 1 } })
        .then(() => {
          res.redirect('/consultarcarrera');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/fail');
        });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});


//CONSULTAR UN ALUMNO Y ELIMINAR
router.get('/consultaralumno', (req, res, next) => {
  Carrera.find()
    .then(carreras => {
      Alumno.find()
        .then(alumnos => {
          res.render('consultaralumno', { alumnos: alumnos, carreras: carreras });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/fail');
        });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});
  
  
//AGREGAR UN ALUMNO//
router.get('/addalumno', (req, res, next) => {
  Carrera.find()
    .then(carreras => {
      res.render('addalumno', { carreras: carreras });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});

// AGREGAR UN ALUMNO //
router.post('/addalumno', (req, res, next) => {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    telefono,
    fechaNacimiento,
    carrera,
    estatus,
    email,
    direccion
  } = req.body;

  Carrera.findById(carrera)
    .then(carreraEncontrada => {
      const newAlumno = new Alumno({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        fechaNacimiento,
        carrera,
        estatus,
        email,
        direccion
      });

      return newAlumno.save();
    })
    .then(() => {
      res.redirect('/profile');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/fail');
    });
});

  


//REGISTRARSE
router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/logout',
    failureRedirect: '/signup',
    passReqToCallback: true
}));



//CONECTARSE
router.get('/signin', (req, res, next) => {
    res.render('signin');

});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));


//IR A FALLO
router.get('/fail', (req, res, next) => {
    res.render('fail');

});


//LOGUEARSE
router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err) return next(err);
        res.redirect('/');
    });
});


//USAR LA AUTENTICACION
router.use((req, res, next)=>{
    isAuthenticated(req, res, next);
    next();
})


//IR A PROFILE
router.get('/profile', (req, res, next)=> {
    res.render('profile');
});

//FUNCION DE AUTHENTICACION
function isAuthenticated (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;