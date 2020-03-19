const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const models = require('../models');
const { sequelize } = require('../models');
const { verifyToken } = require('./auth');
const { secretKey, successMessage } = require('../constants');

const productController = express.Router();

productController.get('/get', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      let page;
      let sort;
      let orderBy;
      let filter_one;
      let filter_two;
      let filter_three;
      let products;

      req.query.page ? (page = req.query.page) : (page = 1);
      req.query.sort ? (sort = req.query.sort) : (sort = 'asc');
      req.query.orderBy ? (orderBy = req.query.orderBy) : (orderBy = 'name');

      if (req.query.filter_one) {
        filter_one = req.query.filter_one;
        req.query.filter_two
          ? (filter_two = req.query.filter_two)
          : (filter_two = filter_one);
        req.query.filter_three
          ? (filter_three = req.query.filter_three)
          : (filter_three = filter_one);

        await sequelize
          .query(
            `SELECT * FROM product WHERE product_id IN (
              SELECT product_id FROM product_attribute AS a 
              JOIN product_attribute AS b USING (product_id) 
              JOIN product_attribute AS c USING (product_id) 
              WHERE a.attribute_value_id = ${filter_one} 
              AND b.attribute_value_id = ${filter_two} 
              AND c.attribute_value_id = ${filter_three})
              ORDER BY ${orderBy} ${sort}
              LIMIT 10 OFFSET ${(page - 1) * 10}`,
            {
              model: models.product,
              mapToModel: true
            }
          )
          .then(products => {
            res.json({
              message: successMessage,
              products
            });
          })
          .catch(error => {
            res.json({
              message: error
            });
          });
      } else {
        await sequelize
          .query(
            `SELECT * FROM product 
          ORDER BY ${orderBy} ${sort}
          LIMIT 10 OFFSET ${(page - 1) * 10}`,
            {
              model: models.product,
              mapToModel: true
            }
          )
          .then(products => {
            res.json({
              message: successMessage,
              products
            });
          })
          .catch(error => {
            res.json({
              message: error
            });
          });
      }
    }
  });
});

productController.get('/get/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      product = await models.product
        .findOne({
          where: { product_id: req.params.id }
        })
        .then(product => {
          res.json({
            message: successMessage,
            product
          });
        })
        .catch(error => {
          res.json({
            message: error
          });
        });
    }
  });
});

productController.get('/get/category/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      let products;
      await sequelize
        .query(
          `SELECT * FROM product 
        WHERE product_id IN 
        (SELECT product_id FROM product_category 
          WHERE category_id = ${req.params.id})`,
          {
            model: models.product,
            mapToModel: true
          }
        )
        .then(products => {
          res.json({
            message: successMessage,
            products
          });
        })
        .catch(error => {
          res.json({
            message: error
          });
        });
    }
  });
});

productController.get('/search', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      await models.product
        .findAll({
          where: {
            name: {
              [Op.like]: `%${req.query.byName}%`
            }
          }
        })
        .then(products => {
          res.json({
            message: successMessage,
            products
          });
        })
        .catch(error => {
          res.json({
            message: error
          });
        });
    }
  });
});

module.exports.productController = productController;
