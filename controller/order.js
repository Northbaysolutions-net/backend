const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('../models');
const { verifyToken } = require('./auth');
const { secretKey } = require('../constants');

const orderController = express.Router();

orderController.post('/add', verifyToken, (req, res) => {
  body = req.body;
  jwt.verify(req.token, secretKey, async err => {
    if (err) {
      res.sendStatus(403);
    } else {
      await models.order.create(body).then(createResponse => {
        res.json({
          message: createResponse
        });
      });
    }
  });
});

module.exports.orderController = orderController;
