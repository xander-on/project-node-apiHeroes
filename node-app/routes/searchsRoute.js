const { Router } = require('express');
const { searchs, noIdentificator } = require('../controllers/searchsController');

const router = Router();
router.get('/:collection', noIdentificator)

router.get('/:collection/:identificator', searchs)


module.exports = router;
