const OrdersController = require('../controllers/order');
const { checkToken } = require('../middleware/tokenAuth');
var express = require('express');
var router = express.Router();

router.post('/create-order', checkToken, OrdersController.placeOrder);
// router.get('/get-product-by-id/:id', OrdersController.getProductById);
// router.get(
//   '/get-product-by-category/:id',
//   ProductsController.getProductByCategory
// );

const ordersRouter = router;

module.exports = { ordersRouter };
