const { response }   = require("express");
const { User }       = require("../models");
const bycryptjs      = require('bcryptjs');
const { generarJWT } = require("../helpers");


const login = async( req, res=response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //verificar si el usuario existe
        if( !user ){
            return res.status(400).json(
               ['Usuario / Password no son correctos - correo']
            );
               // {msg: 'Usuario / Password no son correctos - correo'}
        }

        //si el usuario esta activo
        if( !user.state ){
            return res.status(400).json(
                ['Usuario no se encuentra activo']
                // { msg:'Usuario no se encuentra activo' }
            );
        }

        //verificar el password
        const validPassword = bycryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json(
                ['Usuario / Password no son correctos - password']
            );
        }

        //generar el jwt
        const token = await generarJWT( user.id );

        res.json({ user, token })

    } catch (error) {
        return res.status(500).json(
            ['Hable con el administrador']
        );
    }
}


module.exports = {
    login,
}
