const Product = require('../models').product;
const ProductCategory = require('../models').product_category;
const { Op } = require('sequelize');

class ProductsController {
  static async getAllProducts(req, res, next) {
    const { page, search } = req.query;
    let options;
    if (search) {
      options = {
        page: page,
        paginate: 10,
        order: [['name', 'ASC']],
        where: {
          name: {
            [Op.like]: `${search}%`
          }
        }
      };
    } else {
      options = {
        page: page,
        paginate: 10,
        order: [['name', 'ASC']]
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
    console.log(id);
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
    const { page, search } = req.query;
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
      paginate: 10
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
