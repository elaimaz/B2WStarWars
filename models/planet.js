const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const planetScheme = new mongoose.Schema({
    planetName: {
        type: String,
        unique: true
    },
    climate: String,
    terrain: String,
    moviesIn: Number
});

planetScheme.plugin(uniqueValidator);

planetScheme.set('toJson', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Planet = mongoose.model('Planet', planetScheme);

module.exports = Planet;
