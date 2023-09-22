const { Schema, model } = require('mongoose');

const PublisherSchema = Schema({
    name:{
        type     : String,
        required : [true, 'El nombre del publisher es obligatorio']
    }
});


module.exports = model('Publisher', PublisherSchema)
