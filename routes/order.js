var express = require("express");
var router = express.Router();
var order = require("../controllers/order");

router.post("/", order.insertOrder);

module.exports = router;
