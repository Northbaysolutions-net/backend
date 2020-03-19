var express = require('express');
var router = express.Router();
var attribute = require('../controllers/attribute'); 

router.get('/', attribute.getAttribute);

module.exports = router;

