const Category = require('../models').category;

class CategoryController {
  static async getAllCategories(req, res, next) {
    Category.findAll()
      .then(categories => {
        res.json(categories);
      })
      .catch(error => {
        res.status(400).json({
          error: error,
          success: false,
          message: 'Invalid Request! Please check the request'
        });
      });
  }
}

module.exports = CategoryController;
