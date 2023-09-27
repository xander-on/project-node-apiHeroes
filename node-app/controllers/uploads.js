const path           = require('path');
const fs             = require('fs');
const { response }   = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Hero } = require('../models');

const postImage = async( req, res=response ) => {
    try{
        const imgName = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ imgName });
    }catch(msg){
        res.status(400).json({ msg });
    }
}


const updateImage = async( req, res=response ) => {
    const { collection, id } = req.params;
    let model, pathImagePrev;

    switch( collection ){
        case 'users':
            model = await User.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'heroes':
            model = await Hero.findById(id);
            if( !model ){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    //path de imagen anterior
    if( model.alt_img ){
        pathImagePrev = path.join(__dirname, '../uploads', collection, model.alt_img );
    }

    try {
        const imgName = await uploadFile( req.files, undefined, collection );
        model.alt_img = imgName;
        await model.save();
        res.json( model );

        //borra la imagen anterior solo si pudo cargar la nueva
        if( fs.existsSync(pathImagePrev) ) fs.unlinkSync(pathImagePrev);

    } catch (msg) {
        res.status(400).json({ msg });
    }


}

module.exports = {
    postImage,
    updateImage
}
