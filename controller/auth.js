const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const models = require('../models');
const {
  successMessage,
  badRequestMessage,
  invalidPasswordMessage,
  userNotFoundMessage,
  secretKey,
  tokenExpiration
} = require('../constants');

const authController = express.Router();

//helpers
findUser = async name => {
  return await models.customer.findOne({
    where: {
      name
    }
  });
};

verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

//controller
authController.post('/signup', async (req, res) => {
  const body = req.body;
  let customer = {};
  try {
    customer.name = body.name;
    customer.email = body.email;
    customer.password = bcrypt.hashSync(body.password, 13);
    customer.shipping_region_id = body.shipping_region_id;
    body.credit_card
      ? (customer.credit_card = body.credit_card)
      : (customer.credit_card = '');
    body.address_1
      ? (customer.address_1 = body.address_1)
      : (customer.address_1 = '');
    body.address_2
      ? (customer.address_2 = body.address_2)
      : (customer.address_2 = '');
    body.city ? (customer.city = body.city) : (customer.city = '');
    body.region ? (customer.region = body.region) : (customer.region = '');
    body.postal_code
      ? (customer.postal_code = body.postal_code)
      : (customer.postal_code = '');
    body.country ? (customer.country = body.country) : (customer.country = '');
    body.day_phone
      ? (customer.day_phone = body.day_phone)
      : (customer.day_phone = '');
    body.eve_phone
      ? (customer.eve_phone = body.eve_phone)
      : (customer.eve_phone = '');
    body.mob_phone
      ? (customer.mob_phone = body.mob_phone)
      : (customer.mob_phone = '');
  } catch (error) {
    res.json({
      message: badRequestMessage,
      status: 400
    });
  }

  await models.customer
    .create(customer)
    .then(addCustomerResponse => {
      res.json({
        customer,
        message: addCustomerResponse
      });
    })
    .catch(error => {
      res.json({
        message: error
      });
    });
});

authController.post('/login', async (req, res) => {
  let name;
  let password;

  req.body.name
    ? (name = req.body.name)
    : res.json({
        message: badRequestMessage
      });
  req.body.password
    ? (password = req.body.password)
    : res.json({
        message: badRequestMessage
      });

  user = await findUser(name);
  if (!user) {
    res.json({
      message: userNotFoundMessage
    });
  } else if (bcrypt.compareSync(password, user.password)) {
    jwt.sign(
      { name, password },
      secretKey,
      { expiresIn: tokenExpiration },
      (err, token) => {
        res.json({
          message: successMessage,
          token
        });
      }
    );
  } else {
    res.json({
      message: invalidPasswordMessage
    });
  }
});

module.exports.authController = authController;
module.exports.verifyToken = verifyToken;
