const mongoose = require('mongoose');
const { Schema } = mongoose;

const alumnoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidoPaterno: {
    type: String,
    required: true
  },
  apellidoMaterno: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  carrera: {
    type: Schema.Types.ObjectId,
    ref: 'Carrera',
    required: true
  },
  estatus: {
    type: String,
    enum: ['INSCRITO', 'NO INSCRITO'],
    required: true
  },
  email: {
    type: String,
    required: false
  },
  telefono: {
    type: String,
    required: false
  },
  direccion: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Alumno', alumnoSchema);