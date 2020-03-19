var express = require("express");
var router = express.Router();
var product = require("../controllers/product");

router.get("/", product.getProducts);

router.get("/:id", product.getProductsbyId);

module.exports = router;
