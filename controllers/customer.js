var models = require("../models");
let jwt = require("jsonwebtoken");
let config = require("../config/config");
let crypto = require("../shared/encrypt_decrypt");

exports.sign_up = (req, res) => {
  let encrypt_password = crypto.encrypt(req.body.password);
  models.customer
    .create({
      name: req.body.name,
      email: req.body.email,
      password: encrypt_password,
      credit_card: req.body.credit_card,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      region: req.body.region,
      postal_code: req.body.postal_code,
      country: req.body.country,
      shipping_region_id: req.body.shipping_region_id,
      day_phone: req.body.day_phone,
      eve_phone: req.body.eve_phone,
      mob_phone: req.body.mob_phone
    })
    .then(customers => {
      if (customers) {
        res.status(200).send("Inserted !");
      } else {
        res.status(400).send("Error in insert new record");
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.sign_in = (req, res) => {
  if (!req.query.email || !req.query.password)
    res.status(401).send("login failed");
  else {
    var password = crypto.encrypt(req.query.password);
    var checkCustomer = { email: req.query.email, password: password };
    models.customer
      .findOne({ where: checkCustomer })
      .then(cus => {
        if (cus) {
          let token = jwt.sign(
            { username: req.query.email },
            config.secret_key,
            {
              expiresIn: "24h"
            }
          );
          res.status(200).json({
            success: true,
            message: "Authentication successful!",
            token: token
          });
        } else {
          res.status(400).send("Customer doesnt exists");
        }
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
};
