const { Schema, model } = require('mongoose');


const HeroSchema = Schema({
    superhero:{
        type     : String,
        required : [true, 'El superhero es obligatorio'],
        unique   : true
    },


    publisher:{
        type: Schema.Types.ObjectId,
        ref      : 'Publisher',
        required : true
    },

    alter_ego:{
        type : String,
    },

    first_appearance: {
        type : String,
    },

    characters:{
        type: String
    },

    alt_img:{
        type: String,
        default: 'no-avatar.jpg'
    },

    created_by:{
        type     : Schema.Types.ObjectId,
        ref      : 'User',
        required : true
    },

    state: {
        type   : Boolean,
        default: true
    },
});


HeroSchema.methods.toJSON = function(){
    const { __v, ...hero } = this.toObject();
    // user.uid = _id;
    return hero;
}

module.exports = model('Heroe', HeroSchema);

