const ProductCategory = require("../models").category;

class CategoryController {
  static async getAllCategories(req, res, next) {
    ProductCategory.findAll()
      .then(docs => {
        const response = {
          count: docs.length,
          categories: docs.map(doc => {
            return {
              doc: doc,
              request: {
                type: "GET",
                url: "http://localhost:3000/category/" + doc.category_id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
}

module.exports = CategoryController;
