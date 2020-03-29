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
      try {
        const customer = await Customers.findOne({
          where: { name: user.name }
        });
        if (user.name === customer.name) {
          try {
            const result = await bcrypt.compare(user.pass, customer.password);
            if (!result) {
              res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
              return res.status(401).json({
                message:
                  'Failed to authorize user. Kindly check your credentials!!'
              });
            }
            let token = jwt.sign({ username: user.name }, process.env.SECRET, {
              expiresIn: '24h' // expires in 24 hours
            });
            return res.json({
              customer_id: customer.customer_id,
              success: true,
              message: 'Authentication successful!',
              token: token
            });
          } catch (error) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.status(401).json({
              message:
                'Failed to authorize user. Kindly check your credentials!!'
            });
          }
        }
      } catch (error) {
        return res.status(400).json({
          message: 'Authentication Failed! Please check the request'
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
}

module.exports = LoginController;
