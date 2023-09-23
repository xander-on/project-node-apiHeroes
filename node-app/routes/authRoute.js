const { Router }        = require("express");
const { check }         = require('express-validator');
const { login }         = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");


const validatorsLogin = [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos
];

const router = Router();

router.post('/login', validatorsLogin, login)


module.exports = router;
