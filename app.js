var express = require('express');
var cors = require('cors');

const { productsRouter } = require('./routes/products');
const { signupRouter } = require('./routes/signup');
const { loginRouter } = require('./routes/login');
const { categoryRouter } = require('./routes/categories');

var app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/product', productsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);

const port = 3000;
app.listen(port, () => {
  console.log('Server Listening on Port 3000!!!');
});
