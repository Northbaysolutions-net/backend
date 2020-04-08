const Product = require("../models").product;
const { Op } = require("sequelize");
var db = require("../models/index");
const ProductCategory = require("../models").product_category;
const ProductAttribute = require("../models").product_attribute;

class ProductsController {
  static async getAllProducts(req, res, next) {
    let { gender, color, size } = req.query;
    if (!size) {
      size = 1;
    }
    if (!color) {
      color = 1;
    }
    if (!gender) {
      gender = 1;
    }
    ProductAttribute.findAll({
      attributes: [
        "product_id",
        db.sequelize.fn("count", db.sequelize.col("attribute_value_id"))
      ],
      where: { attribute_value_id: [size, color, gender] },
      group: ["product_id"]
    })
      .then(docs => {
        if (docs.length >= 0) {
          const response = {
            count: docs.length,
            docs: docs
          };
          res.status(200).json(response);
        } else {
          res.status(404).json({
            message: "No entries found"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  static async getProductByCategory(req, res, next) {
    const id = req.params.id;
    Product.findAll({
      include: [
        {
          model: ProductCategory,
          required: true,
          where: { id: id }
        }
      ]
    })
      .then(products => {
        res.json(products);
      })
      .catch(error => {
        res.status(500).send({
          message: "No entry found for provided category",
          error: error
        });
      });
  }

  static async getSingleProduct(req, res, next) {
    console.log(req.id);
    const id = req.params.id;
    Product.findByPk(id)
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            product: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/product" + doc.product_id
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  static async getProducts(req, res, next) {
    console.log(req.query);
    const { page, condition } = req.query;
    let options;
    if (condition) {
      options = {
        page: page,
        paginate: 25,
        order: [["name", "DESC"]],
        where: { name: { [Op.like]: `${condition}%` } }
      };
    } else {
      options = {
        page: page,
        paginate: 25,
        order: [["name", "DESC"]]
      };
    }

    Product.paginate(options)
      .then(result => {
        res.json({
          docs: result.docs,
          pages: result.pages,
          total: result.total
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
}

module.exports = ProductsController;
