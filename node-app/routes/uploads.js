const { Router }    = require('express');
const { postImage, updateImage } = require('../controllers/uploads');
const { validateFiles, validarCampos } = require('../middlewares');


const router = Router();


const validatorsUpdateImage = [
    validateFiles,
    validarCampos
];

router.post('/', postImage);
router.put('/:collection/:id', validatorsUpdateImage, updateImage);


module.exports = router;
