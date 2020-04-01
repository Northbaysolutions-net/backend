var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let middleware = require('./middlewares/index');
let cors = require('cors');



var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var departmentRouter = require('./routes/department');
var categoryRouter = require('./routes/category');
var productCategoryRouter = require('./routes/productCategory');
var attributeRouter = require('./routes/attribute');
var attributeValueRouter = require('./routes/attributeValue');
var productAttributeRouter = require('./routes/productAttribute');
var customerRouter = require('./routes/customer');
var orderRouter = require('./routes/order');


var app = express();
//let handlers = new HandlerGenerator();


app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/department', departmentRouter);
app.use('/category', categoryRouter);
app.use('/product_category',productCategoryRouter);
app.use('/attribute',attributeRouter);
app.use('/attribute_value',attributeValueRouter);
app.use('/product_attribute',productAttributeRouter);
app.use('/customer',customerRouter);
app.use('/order',orderRouter);
app.post('/check_auth',middleware.checkToken, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
