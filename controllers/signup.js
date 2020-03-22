require('dotenv').config();
var Customers = require('../models/').customer;
var bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

class SignupController {
  static async signup(req, res, next) {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    await Customers.create({
      name: `${req.body.name}`,
      email: `${req.body.email}`,
      password: hashedPassword
    })
      .then(customer => {
        console.log(
          `New ${customer.name} ${customer.email}, with id ${customer.customer_id} has been created.`
        );
        let token = jwt.sign({ username: req.body.name }, process.env.SECRET, {
          expiresIn: '24h' // expires in 24 hours
        });
        res.send({
          message: 'User Registered Successfully',
          id: customer.customer_id,
          email: customer.email,
          token: token
        });
      })
      .catch(error => {
        res.status(401).send({
          message: error.errors[0].message
        });
      });
  }
}

module.exports = SignupController;
