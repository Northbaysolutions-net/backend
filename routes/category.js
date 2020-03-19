var express = require('express');
var router = express.Router();
var category = require('../controllers/category'); 

router.get('/', category.getCategory);

module.exports = router;
