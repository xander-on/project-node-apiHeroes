const { Schema, model } = require('mongoose');

const PublisherSchema = Schema({
    name:{
        type     : String,
        required : [true, 'El nombre del publisher es obligatorio'],
        unique   : true
    },

    state:{
        type     : Boolean,
        default  : true,
        required : true
    },
});


module.exports = model('Publisher', PublisherSchema)
