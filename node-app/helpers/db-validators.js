const { Hero, Publisher } = require("../models")

const existsSuperhero = async( superhero='' ) => {

    const existHero = await Hero.findOne({ superhero:superhero.toUpperCase() })
    if( existHero )
        throw new Error(`El superheroe llamado: '${superhero}' ya esta registrado`);
}


const isValidPublisher = async( publisher = '' ) => {
    if( publisher !== '' ){
        const  existsPublisher =  await Publisher.findOne({ name:publisher })
        if( !existsPublisher )
            throw new Error(`El publisher '${publisher}' no puede ser usado`)
    }
}


const existsHeroById = async( id ) => {
    const heroById = await Hero.findById(id);
    if( !heroById ) throw new Error(`El id ${id}, no existe`);
}

module.exports = {
    existsSuperhero,
    isValidPublisher,
    existsHeroById
}
