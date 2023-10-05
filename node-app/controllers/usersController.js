const { response } = require("express")
const bcryptjs = require('bcryptjs');
const { User } = require("../models");


const getUsers = async(req, res=response) => {

    const { limit=10, from=0 } = req.query;
    const query = { state: true }
    const users = await User.find(query)
        .limit(Number(limit))
        .skip(Number(from));

    res.json({
        total:users.length,
        superheroes:users
    });
}


const getUserById = async( req, res=response ) => {
    const { id } = req.params;
    const user   = await User.findById(id);
    res.json(user);
}


const postUser = async(req, res = response) => {

    const { name, email, password, } = req.body;
    const user = new User({ name, email, password });

    //encriptar la contrasena
    const salt    = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();
    res.json( user );
}


const deleteUser = async( req, res=response ) => {
    const { id } = req.params;

    //borrado logico
    const userDeleted = await User.findByIdAndUpdate( id, { state:false });
    const userAutenticado = req.user;

    res.json({ userDeleted, userAutenticado })
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    deleteUser
}
