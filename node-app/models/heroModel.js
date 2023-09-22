const { Schema, model } = require('mongoose');


const HeroSchema = Schema({
    superhero:{
        type     : String,
        required : [true, 'El superhero es obligatorio'],
        unique   : true
    },

    publisher:{
        type     : String,
        required : [true, 'El publisher es obligatorio'],
        // enum     : ['Marvel Comics', 'DC Comics']
    },

    alterEgo:{
        type : String,
    },

    first_appearance: {
        type : String,
    },

    state: {
        type   : Boolean,
        default: true
    },

    characters:{
        type: String
    },

    alt_img:{
        type: String,
        default: 'no-avatar.jpg'
    }
});


HeroSchema.methods.toJSON = function(){
    const { __v, ...user } = this.toObject();
    // user.uid = _id;
    return user;
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
