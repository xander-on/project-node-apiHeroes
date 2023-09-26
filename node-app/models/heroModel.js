const { Schema, model } = require('mongoose');


const HeroSchema = Schema({
    superhero:{
        type     : String,
        required : [true, 'El superhero es obligatorio'],
        unique   : true
    },

    // publisher:{
    //     type     : String,
    //     required : [true, 'El publisher es obligatorio'],
    // },

    publisher:{
        type: Schema.Types.ObjectId,
        ref      : 'Publisher',
        required : true
    },

    alterEgo:{
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


// {
//     "id": "2zaa1_V",
//     "superhero": "no vale2",
//     "publisher": "Marvel Comics",
//     "alter_ego": "no vale 2",
//     "first_appearance": "sdfs",
//     "characters": "sdfs",
//     "alt_img": "https://img.freepik.com/vector-gratis/superheroe-parado-frente-rayos-sol_603843-1871.jpg"
// }
