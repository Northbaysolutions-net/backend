const express = require('express');

const { productController } = require('./controller/product');
const { authController } = require('./controller/auth');
const { orderController } = require('./controller/order');
const { categoryController } = require('./controller/category');
const { backendServerPort } = require('./constants');

const app = express();
app.use(express.json());

app.use('/products', productController);
app.use('/auth', authController);
app.use('/order', orderController);
app.use('category', categoryController);

app.listen(backendServerPort, () =>
  console.log(`Server started on port ${backendServerPort}`)
);
