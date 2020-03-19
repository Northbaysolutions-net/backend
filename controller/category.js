const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../models');
const { secretKey, successMessage, failureMessage } = require('../constants');

const categoryController = express.Router();

categoryController.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      await models.category
        .findAll()
        .then(categories => {
          res.json({
            message: successMessage,
            categories
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

module.exports.categoryController = categoryController;
