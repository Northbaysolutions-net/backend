var express = require("express");
var router = express.Router();
const CategoriesController = require("../controllers/categories");

router.get("/getAllCategories", CategoriesController.getAllCategories);

const categoriesRouter = router;

module.exports = { categoriesRouter };
