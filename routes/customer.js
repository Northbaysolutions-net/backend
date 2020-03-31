var express = require("express");
var router = express.Router();
var customer = require('../controllers/customer'); 

router.post("/sign_up", customer.sign_up);

router.get("/sign_in",customer.sign_in);

router.put("/customer_address/:customer_id",customer.customer_address);


module.exports = router;
