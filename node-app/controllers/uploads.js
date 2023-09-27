const path           = require('path');
const fs             = require('fs');
const { response }   = require("express");
const { uploadFile } = require("../helpers/upload-file");
const { User, Hero } = require('../models');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.C)

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


const updateImageCloudinary = async( req, res=response ) => {
    const { collection, id } = req.params;
    let model;
    const mainNameFolder = 'api-heroes';

    switch( collection ){
        case 'users':
            model = await User.findById( id );
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'heroes':
            model = await Hero.findById( id );
            if( !model ){
                return res.status(400).json({
                    msg: `No existe un Heroe con el id: ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    //limpiar imagenes previas
    if( model.alt_img ){
        const imgNameArr = model.alt_img.split('/');
        const nombreImg  = imgNameArr[ imgNameArr.length -1 ];
        const [ idImg ]  = nombreImg.split('.');
        cloudinary.uploader.destroy( `${mainNameFolder}/${collection}/${idImg}` );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url }   = await cloudinary.uploader.upload(
        tempFilePath,
        { folder: `${mainNameFolder}/${collection}`}
    );

    model.alt_img = secure_url;
    await model.save();

    res.json( model );
}


const getImage = async( req, res=response ) => {

    const { collection, id } = req.params;
    let model;

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
                    msg: `No existe un heroe con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'});
    }

    if( model.alt_img ){
        // const pathImage = path.join(__dirname, '../uploads', collection, model.alt_img );
        // if( fs.existsSync(pathImage) ) return res.sendFile( pathImage );

        //ver imagen de cloudinary haciendo redirect
        const pathImage = model.alt_img;
        return res.redirect( pathImage );
    }

    //si no existe la imagen envia un default image
    const pathImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathImage );
}

module.exports = {
    postImage,
    updateImage,
    updateImageCloudinary,
    getImage
}
