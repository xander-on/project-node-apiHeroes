const { Router }    = require('express');
const { check }     = require('express-validator');
const { postImage, updateImage, updateImageCloudinary } = require('../controllers/uploads');
const { validateFiles, validarCampos } = require('../middlewares');
const { isValidCollection } = require('../helpers');


const router = Router();


const validatorsUpdateImage = [
    validateFiles,
    check('id', 'El id debe ser un id de mongo valido').isMongoId(),
    check('collection').custom( c => isValidCollection( c, ['users', 'heroes']) ),
    validarCampos
];

router.post('/', postImage);
// router.put('/:collection/:id', validatorsUpdateImage, updateImage);
router.put('/:collection/:id', validatorsUpdateImage, updateImageCloudinary);



module.exports = router;
