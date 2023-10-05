const { response } = require("express");
const Hero         = require('../models/heroModel');
const { nextPrevUrlGenerator } = require("../helpers/urls-generator");

const getHeroes = async( req, res = response ) => {
    const { limit=12, offset=0 } = req.query;
    const query = { state: true }
    const totalHeroes = await Hero.countDocuments(query);
    const heroes = await Hero.find(query)
        .populate('publisher', 'name')
        .populate('created_by', 'name')
        .limit(Number(limit))
        .skip(Number(offset));

    const { next, prev } = nextPrevUrlGenerator(offset, limit, totalHeroes);

    res.json({
        total:totalHeroes,
        next: next,
        prev: prev,
        results:heroes
    });
}


const getHeroById = async( req, res = response ) => {
    const { id } = req.params;
    const hero = await Hero.findById(id)
    .populate('publisher', 'name')
    .populate('created_by', 'name');

    res.json( hero );
}


const postHero = async( req, res = response ) => {

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance='no date',
        characters = 'no characters',
        alt_img = 'no-avatar.jpg',
        created_by,
    } = req.body;

    const heroCreated = new Hero(
        {
            superhero:superhero.toUpperCase(),
            publisher,
            alter_ego:alter_ego.toUpperCase(),
            first_appearance:first_appearance.toUpperCase(),
            characters:characters.toUpperCase(),
            alt_img,
            created_by: req.user._id
        }
    );

    await heroCreated.save();

    res.status(201).json(heroCreated);
}


const putHero = async( req, res = response ) => {
    const { id } = req.params;
    const {_id, state, __v,
        superhero,
        publisher,
        alter_ego,
        characters,
        alt_img,
        first_appearance
    } = req.body;

    const heroToUpdate = {
        superhero:superhero.toUpperCase(),
        publisher,
        alter_ego:alter_ego.toUpperCase(),
        first_appearance:first_appearance.toUpperCase(),
        characters:characters.toUpperCase(),
        alt_img,
    }

    console.log(heroToUpdate);

    const heroUpdated = await Hero.findByIdAndUpdate( id, heroToUpdate, {new:true} );
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
