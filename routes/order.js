const express = require("express");
const router = express.Router();
require("dotenv").config();
var checkToken = require ('../middlewares/token').checkToken
const createOrder = require('../controllers/orderController')


router.post("/order", checkToken, function(req, res, next) {
  createOrder(req, res);
});

module.exports = router;