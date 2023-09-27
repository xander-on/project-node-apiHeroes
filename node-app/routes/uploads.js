const { Router }    = require('express');
const { postImage, updateImage } = require('../controllers/uploads');


const router = Router();


router.post('/', postImage);
router.put('/:collection/:id', updateImage);


module.exports = router;
