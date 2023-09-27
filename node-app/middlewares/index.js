const validarCampos = require('./validar-campos');
const validarJWT    = require('./validar-jwt');
const validarRoles  = require('./validar-roles');
const validateFiles = require('./validate-files')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validateFiles
}
