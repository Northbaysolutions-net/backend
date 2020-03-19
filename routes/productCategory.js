var express = require('express');
var router = express.Router();
var productCategory = require('../controllers/productCategory'); 

router.get('/', productCategory.getProduct_category);

module.exports = router;

