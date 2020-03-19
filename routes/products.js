const ProductsController = require('../controllers/products');
var express = require('express');
var router = express.Router();

router.get('/get-all-products', ProductsController.getAllProducts);
router.get('/get-product-by-id/:id', ProductsController.getProductById);
router.get(
  '/get-product-by-category/:id',
  ProductsController.getProductByCategory
);

const productsRouter = router;

module.exports = { productsRouter };
