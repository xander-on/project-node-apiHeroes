const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    const errorsArr = errors.errors.map( e => `${e.path.toUpperCase()}: ${e.msg}` );
    if( !errors.isEmpty() ) return res.status(400).json(errorsArr)
    next();
}

module.exports = {
    validarCampos
}
