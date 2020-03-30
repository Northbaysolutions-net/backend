var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const db = require("./models/index");
var cors = require('cors');

// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

const loginRouter = require("./routes/signIn");
const productRouter = require("./routes/products");
const signUpRouter = require("./routes/signup");
const configRouter = require ('./routes/categories');
const orderRouter = require ('./routes/order')


var sessionStore = new SequelizeStore({
  db: db.sequelize
});

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
sessionStore.sync();

app.use(
  session({
    secret: "keyboard cat",
    store: sessionStore,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
  })
);

var corsOptions = {
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use("/", loginRouter);
app.use("/products", productRouter);
app.use("/", signUpRouter);
app.use ('/', configRouter);
app.use ('/', orderRouter)

// error handler

module.exports = app;
