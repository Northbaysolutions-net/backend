var express = require("express");
var router = express.Router();
const ProductsController = require("../controllers/products");

router.get("/get-products", ProductsController.getAllProducts);
router.get("/get-product/:id", ProductsController.getSingleProduct);
router.get("/products", ProductsController.getProducts);
router.get(
  "/api/product-by-category/:id",
  ProductsController.getProductByCategory
);

const productsRouter = router;

module.exports = { productsRouter };
