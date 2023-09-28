const { Router } = require('express');
const { check }  = require('express-validator');
const { existEmail, existsUserById }      = require('../helpers');
const { validarCampos, validarJWT, tieneRol } = require('../middlewares/');
const {
    getUsers, getUserById,
    postUser, deleteUser }      = require('../controllers/usersController');


const router = Router();

const validatorGetUser = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existsUserById ),
    validarCampos,
];

const validatorPostUser = [
    check('name',     'El nombre es obligatorio').not().isEmpty(),
    check('email',    'El correo no es valido').isEmail(),
    check('email').custom( existEmail ),
    check('password', 'El password debe de ser mayor a 6 letras').isLength({ min:6 }),
    // check('role').custom( isValidRolePost ),
    validarCampos,
];


const validatorDeleteUser = [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE'),
    validarCampos
];


router.get('/',       getUsers);
router.get('/:id',    validatorGetUser,    getUserById);
router.post('/',      validatorPostUser,   postUser);
router.delete('/:id', validatorDeleteUser, deleteUser);

module.exports = router;
