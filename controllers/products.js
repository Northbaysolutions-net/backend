const Product = require('../models').product;
const ProductCategory = require('../models').product_category;
const ProductAttribute = require('../models').product_attribute;
const { Op } = require('sequelize');

class ProductsController {
  static async getAllProducts(req, res, next) {
    const { page, search, sort } = req.query;
    if (!sort) {
      sort = 'ASC';
    }
    let options;
    if (search) {
      options = {
        page: page,
        paginate: 10,
        where: {
          name: {
            [Op.iLike]: `%${search}%`
          }
        },
        order: [['price', sort]]
      };
    } else {
      options = {
        page: page,
        paginate: 10,
        order: [['price', sort]]
      };
    }
    Product.paginate(options)
      .then(result => {
        res.json({
          data: result.docs,
          pages: result.pages,
          total: result.total
        });
      })
      .catch(error => {
        res.status(400).json({
          error: error,
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      });
  }

  static async getProductById(req, res, next) {
    const id = req.params.id;
    Product.findOne({
      where: { product_id: id }
    })
      .then(product => {
        res.json(product);
      })
      .catch(error => {
        res.status(404).send({
          message: 'Product Not Found',
          error: error
        });
      });
  }

  static async getProductByCategory(req, res, next) {
    const id = req.params.id;
    let { page, search, sort } = req.query;
    if (!sort) {
      sort = 'ASC';
    }
    console.log(page);
    let options = {
      include: [
        {
          model: Product,
          required: true
        }
      ],
      where: { category_id: id },
      page: page,
      paginate: 10,
      order: [[Product, 'price', sort]]
    };
    ProductCategory.paginate(options)
      .then(products => {
        res.json(products);
      })
      .catch(error => {
        res.status(500).send({
          message: 'Failed to Retrieve Data!!',
          error: error
        });
      });
  }
}

module.exports = ProductsController;
