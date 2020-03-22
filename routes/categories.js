var express = require('express');
var router = express.Router();
const CategoryController = require('../controllers/categories');

router.get('/get-all-categories', CategoryController.getAllCategories);

const categoryRouter = router;

module.exports = { categoryRouter };
