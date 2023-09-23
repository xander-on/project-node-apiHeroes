const { response } = require("express");
const Hero         = require('../models/heroModel');

const getHeroes = async( req, res = response ) => {
    const { limit=10, from=0 } = req.query;
    const query = { state: true }
    const heroes = await Hero.find(query)
        .limit(Number(limit))
        .skip(Number(from));

    res.json({
        total:heroes.length,
        superheroes:heroes
    });
}


const getHeroById = async( req, res = response ) => {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    res.json( hero );
}


const postHero = async( req, res = response ) => {

    const {
        superhero,
        publisher,
        alterEgo,
        first_appearance='no date',
        characters = 'no characters',
        alt_img = 'no-avatar.jpg'
    } = req.body;

    const heroCreated = new Hero(
        {
            superhero:superhero.toUpperCase(),
            publisher,
            alterEgo,
            first_appearance,
            characters,
            alt_img
        }
    );

    await heroCreated.save();

    res.json({
        heroCreated
    });
}


const putHero = async( req, res = response ) => {
    const { id } = req.params;
    const {_id, state, __v, ...resto} = req.body;
    const heroUpdated = await Hero.findByIdAndUpdate( id, resto, {new:true} );
    res.json( heroUpdated );
}


const deleteHero = async( req, res=response ) => {
    const { id } = req.params;
    const deletedHero =  await Hero.findByIdAndUpdate( id, {state:false}, {new:true} );
    res.json( deletedHero );
}

module.exports = {
    getHeroes,
    getHeroById,
    postHero,
    putHero,
    deleteHero,
}
