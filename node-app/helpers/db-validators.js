const { Hero, Publisher, User } = require("../models")

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


const existsPublisherById = async( id ) => {
    const publisherOfDB =  await Publisher.findById( id );
    if( !publisherOfDB ) throw new Error(`El id del publisher no existe ${ id }`)
}


const existsUserById = async( id ) => {
    const userById = await User.findById(id);
    if( !userById ) throw new Error(`El id ${id}, no existe`);
}


const existEmail = async( email = '' ) => {
    const emailDB = await User.findOne({ email });
    if( emailDB )
        throw new Error(`El email: ${ email }, ya esta registrado`);
}


const isValidCollection = ( collection= '', collections=[] ) => {

    const includesCollection = collections.includes( collection );
    if( !includesCollection ){
        throw new Error( `La colección '${ collection }' no es permitida, solo [${ collections}]`);
    }

    return true;
}

module.exports = {
    existsSuperhero,
    isValidPublisher,
    existsHeroById,
    existsUserById,
    existEmail,
    existsPublisherById,
    isValidCollection
}
