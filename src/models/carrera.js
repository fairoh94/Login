const mongoose = require('mongoose');
const { Schema } = mongoose;

const carreraSchema = new Schema({
  carrera: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Carrera', carreraSchema);