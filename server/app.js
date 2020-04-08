var express = require("express");

const { signupRouter } = require("./routes/signup");
const { signinRouter } = require("./routes/signin");
const { productsRouter } = require("./routes/products");
const { categoriesRouter } = require("./routes/categories");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/product", productsRouter);
app.use("/category", categoriesRouter);

const port = 3000;
app.listen(port, () => {
  console.log("Server Listening on Port 3000!!!");
});
