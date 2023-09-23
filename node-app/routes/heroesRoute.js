const { Router } = require('express');
const { check } = require('express-validator');

const {
    getHeroes,
    getHeroById,
    postHero,
    putHero,
    deleteHero,
} = require('../controllers/heroesControllers');

const { validarCampos } = require('../middlewares/validar-campos');
const { existsSuperhero, isValidPublisher, existsHeroById } = require('../helpers');


const router = Router();

const validatorPostHero = [
    check('superhero', 'El campo superhero es obligatorio').not().isEmpty(),
    check('superhero').custom( existsSuperhero ),
    check('publisher').custom( isValidPublisher ),
    validarCampos,
];

const validatorPutHero = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existsHeroById ),
    check('publisher').custom( isValidPublisher ),
    validarCampos,
];

const validatorGetHeroById = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existsHeroById ),
    validarCampos,
];


const validatorDeleteHero = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existsHeroById ),
    validarCampos,
];

router.get('/',     getHeroes);
router.get('/:id',  validatorGetHeroById, getHeroById);
router.put('/:id',  validatorPutHero,    putHero);
router.post('/',    validatorPostHero,   postHero);
router.delete('/:id', validatorDeleteHero, deleteHero);



module.exports = router;
