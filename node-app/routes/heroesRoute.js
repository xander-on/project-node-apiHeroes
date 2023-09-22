const { Router } = require('express');
const { check } = require('express-validator');

const {
    getHeroes,
    getHeroById,
    postHeroes,
    putHeroes,
} = require('../controllers/heroesControllers');

const { validarCampos } = require('../middlewares/validar-campos');
const { existsSuperhero, isValidPublisher, existsHeroById } = require('../helpers');


const router = Router();

const validatorPostHeroes = [
    check('superhero', 'El campo superhero es obligatorio').not().isEmpty(),
    check('superhero').custom( existsSuperhero ),
    check('publisher').custom( isValidPublisher ),
    validarCampos,
];

const validatorPutHeroes = [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existsHeroById ),
    check('publisher').custom( isValidPublisher ),
    validarCampos,
];

router.get('/',    getHeroes);
router.get('/:id', getHeroById);
router.put('/:id', validatorPutHeroes,  putHeroes);
router.post('/',   validatorPostHeroes, postHeroes)


module.exports = router;
