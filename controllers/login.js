require('dotenv').config();
let jwt = require('jsonwebtoken');
var basicAuth = require('basic-auth');
var Customers = require('../models').customer;
var bcrypt = require('bcrypt');

class LoginController {
  static async login(req, res) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.status(401).json({
        message: 'Failed to authorize user. Kindly check your credentials!!'
      });
      return;
    }
    if (user.name && user.pass) {
      await Customers.findOne({
        where: { name: user.name }
      })
        .then(async customer => {
          if (user.name === customer.name) {
            await bcrypt
              .compare(user.pass, customer.password)
              .then(result => {
                if (result) {
                  let token = jwt.sign(
                    { username: user.name },
                    process.env.SECRET,
                    {
                      expiresIn: '24h' // expires in 24 hours
                    }
                  );
                  res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                  });
                } else {
                  res.set(
                    'WWW-Authenticate',
                    'Basic realm=Authorization Required'
                  );
                  res.status(401).json({
                    message:
                      'Failed to authorize user. Kindly check your credentials!!'
                  });
                  return;
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            res.status(401).json({
              message:
                'Failed to authorize user. Kindly check your credentials!!'
            });
          }
        })
        .catch(error => {
          res.status(401).json({
            message: 'Failed to authorize user. Kindly check your credentials!!'
          });
        });
    } else {
      res.status(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
}

module.exports = LoginController;
