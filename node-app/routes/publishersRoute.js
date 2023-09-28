const { Router } = require("express");
const { getPublishers } = require("../controllers/publishersController");



const router = Router();

router.get('/',       getPublishers);

module.exports = router;
