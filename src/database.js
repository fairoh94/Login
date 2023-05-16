const mongoose = require ('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.URI, {})
    .then(db => console.log('Database conectada'))
    .catch(err => console.error(err));