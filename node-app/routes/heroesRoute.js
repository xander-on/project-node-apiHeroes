const { Router } = require('express');
const { check }  = require('express-validator');

const {
    getHeroes,
    getHeroById,
    postHero,
    putHero,
    deleteHero,
} = require('../controllers/heroesControllers');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    existsSuperhero,
    isValidPublisher,
    existsHeroById,
    existsPublisherById
} = require('../helpers');
const { validarJWT } = require('../middlewares');


const router = Router();

const validatorPostHero = [
    validarJWT,
    check('superhero', 'El campo superhero es obligatorio').not().isEmpty(),
    check('superhero').custom( existsSuperhero ),
    check('publisher', 'No es un id de mongo').isMongoId(),
    check('publisher').custom( existsPublisherById ),
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

router.get('/',       getHeroes);
router.get('/:id',    validatorGetHeroById, getHeroById);
router.post('/',      validatorPostHero,    postHero);
router.put('/:id',    validatorPutHero,     putHero);
router.delete('/:id', validatorDeleteHero,  deleteHero);



module.exports = router;
