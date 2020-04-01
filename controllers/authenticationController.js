const { Op } = require("sequelize");
const db = require("../models/index");
require("dotenv").config();
const { encrypt } = require("../utils/encryption");
const Customer = require("../models").customer;
let jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  let {
    userName,
    password,
    email,
    credit_card,
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id,
    mob_phone
  } = JSON.parse(JSON.stringify(req.body));

  const userNameEncrypted = encrypt(userName);
  const passwordEncrypted = encrypt(password);

  return db.customer
    .create({
      name: userNameEncrypted,
      password: passwordEncrypted,
      email: email,
      credit_card: credit_card,
      address_1: address_1,
      address_2: address_2,
      city: city,
      region: region,
      postal_code: postal_code,
      country: country,
      shipping_region_id: shipping_region_id,
      mob_phone: mob_phone
    })
    .then(result => {
      res.status(200).json({
        results: result
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

function login(req, res) {
  const { name, pass } = req.body;
  if (name && pass) {
    return Customer.findOne({
      where: {
        [Op.and]: [{ name: name }, { password: pass }]
      }
    })
      .then(result => {
        if (result) {
          let token = jwt.sign(
            { username: name },
            process.env.SECRET,
            {
              expiresIn: "24h" // expires in 24 hours
            }
          );

          res.json({
            success: true,
            message: "Authentication successful!",
            token: token,
            customer_id: result.customer_id
          });
        } else {
          throw err;
        }
      })
      .catch(() => {
        res.status(403).json({
          success: false,
          message: "incorrect user name or password"
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "Authentication failed! Please check the request"
    });
  }

  // return the JWT token for the future API calls
}

module.exports = { createUser, login };
