var express = require('express');
var router = express.Router();
var productAttribute = require("../controllers/productAttribute");

router.get('/', productAttribute.getProduct_attribute);

module.exports = router;

