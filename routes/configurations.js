const ConfigurationsController = require('../controllers/configurations');
var express = require('express');
var router = express.Router();

router.get('/get-configurations', ConfigurationsController.getConfigurations);

const configurationsRouter = router;

module.exports = { configurationsRouter };
