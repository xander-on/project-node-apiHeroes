const { Router }    = require('express');
const { check }     = require('express-validator');
const {
    postImage,
    // updateImage,
    updateImageCloudinary,
    getImage
} = require('../controllers/uploads');

const { validateFiles, validarCampos } = require('../middlewares');
const { isValidCollection } = require('../helpers');


const router = Router();


const validatorsUpdateImage = [
    validateFiles,
    check('id', 'El id debe ser un id de mongo valido').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['users', 'heroes']) ),
    validarCampos
];

const validatorsGetImage = [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['users', 'heroes']) ),
    validarCampos
];

router.post('/', postImage);
// router.put('/:collection/:id', validatorsUpdateImage, updateImage);
router.put('/:collection/:id', validatorsUpdateImage, updateImageCloudinary);
router.get('/:collection/:id', validatorsGetImage, getImage);



module.exports = router;
