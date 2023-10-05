const { response } = require("express");
const { Hero } = require("../models");
const { ObjectId } = require('mongoose').Types;

const collectionsAllowed = [
    'heroes'
];

const searchHeroes = async(identificator='', res=response) => {

    const isMongoID = ObjectId.isValid( identificator );

    if( isMongoID ){
        const hero = await Hero.findById( identificator );

        // return res.json({
        //     results:hero ? [ hero ] : []
        // });

        return res.json(hero ? [ hero ] : [] );
    }

    const regex = new RegExp( identificator, 'i');

    const heroes = await Hero.find({
        $or:[{superhero:regex }, { alter_ego:regex }],
        $and:[{ state:true }]
    });

    res.json( heroes );
}


const noIdentificator = (req, res=response) => {

    const { collection } = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg:`Collections allowed: ${collectionsAllowed}`
        });
    }

    return res.status(400).json({
        msg: `Debe proporcionar un identificador (nombre o id) para la busqueda en la url`
    });

}


const searchs = (req, res=response) => {

    const { collection, identificator } = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg:`Collections allowed: ${collectionsAllowed}`
        });
    }


    switch (collection) {
        case 'heroes':
            searchHeroes(identificator, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            });
            break;
    }
}


module.exports = {
    searchs,
    noIdentificator
}
