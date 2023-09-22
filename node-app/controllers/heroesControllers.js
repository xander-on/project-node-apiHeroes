const { response } = require("express");
const Hero         = require('../models/heroModel');

const getHeroes = async( req, res = response ) => {
    // const query = { state: true }
    // const heroes = await Hero.find(query);

    res.json({ msg: 'get Heroes' })
}


const getHeroById = async( req, res = response ) => {
    const { id } = req.params;
    res.json({
        msg: 'get Hero By ID',
        id
    });
}


const postHeroes = async( req, res = response ) => {

    const {
        superhero,
        publisher,
        alterEgo,
        first_appearance='no date',
        characters = 'no characters',
        alt_img = 'no-avatar.jpg'
    } = req.body;

    const hero = new Hero(
        {
            superhero:superhero.toUpperCase(),
            publisher,
            alterEgo,
            first_appearance,
            characters,
            alt_img
        }
    );

    await hero.save();

    res.json({
        hero
    });
}


const putHeroes = async( req, res = response ) => {
    const { id } = req.params;
    const {_id, state, __v, ...resto} = req.body;
    await Hero.findByIdAndUpdate( id, resto );
    const heroUpdated = await Hero.findById(id);
    res.json({ heroUpdated });
}


module.exports = {
    getHeroes,
    getHeroById,
    postHeroes,
    putHeroes,
}
