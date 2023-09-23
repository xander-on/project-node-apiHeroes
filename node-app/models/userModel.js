const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    name:{
        type     : String,
        required : [true, 'El nombre es obligatorio'],
    },

    email:{
        type     : String,
        required : [true, 'El email es obligatorio'],
        unique   : true
    },

    password:{
        type     : String,
        required : [true, 'El password es obligatorio'],
    },

    role:{
        type     : String,
        default  : 'USER_ROLE',
        enum     : ['ADMIN_ROLE', 'USER_ROLE']
    },

    alt_img:{
        type: String,
        default: 'no-avatar.jpg'
    },

    state: {
        type   : Boolean,
        default: true
    },
});


UserSchema.methods.toJSON = function(){
    const { _id, __v, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
