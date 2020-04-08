var _ = require("lodash");
const Product = require("./models").product;
const { Op } = require("sequelize");
const ProductCategory = require("./models").product_category;
const ProductAttribute = require("./models").product_attribute;
class ProductsController {
  static async getAllProducts(req, res, next) {
    ProductAttribute.findAll()
      .then(docs => {
        console.log(docs);
        // const response = {
        //   count: docs.length,
        //   products: docs.map(doc => {

        //     return {
        //       name: doc.name,
        //       price: doc.price,
        //       productImage: doc.image,
        //       id: doc.product_id,
        //       request: {
        //         type: "GET",
        //         url: "http://localhost:3000/products/" + doc._id
        //       }
        //     };
        //   })
        // };
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
// var people = [
//   { name: "Tom", age: 19 },
//   { name: "John", age: 3 },
//   { name: "Seven", age: 37 },
//   { name: "John", age: 42 }
// ];

// var filtered_people = _.filter(people, function(p) {
//   return _.includes([19, 3, 37], p.age);
// });

// console.log(filtered_people); // Array[3]
module.exports = ProductsController;
