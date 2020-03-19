var express = require('express');
var router = express.Router();
var department = require('../controllers/department'); 

router.get('/', department.getDepartment);

module.exports = router;

