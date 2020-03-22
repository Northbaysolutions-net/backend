require('dotenv').config();
var express = require('express');
var router = express.Router();
const LoginController = require('../controllers/login');

router.post('/', LoginController.login);

const loginRouter = router;

module.exports = { loginRouter };
