require('dotenv').config();
var Customers = require('../models/').customer;
var bcrypt = require('bcrypt');

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
        res.send({
          message: 'User Registered Successfully',
          id: customer.customer_id,
          email: customer.email
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = SignupController;
