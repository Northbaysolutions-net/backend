const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Customers = require("../models/").customer;
require("dotenv").config();
const authenticate = params => {
  return Customers.findOne({
    where: {
      email: params.email
    },
    raw: true
  }).then(customer => {
    if (!customer)
      throw new Error("Authentication failed. customer not found.");
    if (!bcrypt.compareSync(params.password || "", customer.password))
      throw new Error("Authentication failed. Wrong password.");
    const payload = {
      email: customer.email,
      id: customer.id,
      time: new Date()
    };
    var token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME
    });
    return token;
  });
};

module.exports = {
  authenticate
};
