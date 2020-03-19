var express = require('express');
var router = express.Router();
var attribute_value = require('../controllers/attributeValue'); 

router.get('/',attribute_value.getAttribute_value);

module.exports = router;

