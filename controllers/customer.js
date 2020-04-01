var models = require("../models");
let jwt = require("jsonwebtoken");
let config = require("../config/config");
let crypto = require("../shared/encrypt_decrypt");

exports.sign_up = (req, res) => {
  let {name, password, email } = req.body
  let encrypt_password = crypto.encrypt(password);
  models.customer
    .create({
      name,
      email,
      password: encrypt_password
    })
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
          token: token,
          customer_id : cus.customer_id,
          customer : {
            name: cus.name ,
            email: cus.email,
            address_1: cus.address_1,
            address_2: cus.address_2,
            city: cus.city,
            region: cus.region,
            postal_code: cus.postal_code,
            country: cus.country,
            shipping_region_id: cus.shipping_region_id,
            day_phone: cus.day_phone,
            eve_phone: cus.eve_phone,
            mob_phone: cus.mob_phone
          }
        });
      } else {
        res.status(400).send("Customer doesnt exists");
    }})
    .catch(error => {
      res.status(400).send(error);
    });
};


exports.customer_address = (req, res) => {

  let {customer_id} = req.params
  if (!(customer_id) || (customer_id < 1))
    res.status(401).send("kindly pass valid customer_id");
  else{

    let {credit_card, address_1, address_2, city, region, postal_cod, country, shipping_region_id,
    day_phone, eve_phone, mob_phone} = req.body
  
    models.customer
      .update({
        credit_card,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        day_phone,
        eve_phone,
        mob_phone
      },
      { where: { customer_id : customer_id } })
      .then(cus => {
        if (cus) {
          res.status(200).json({
            customer_id : cus.customer_id
          });
        } else {
          res.status(400).send("Customer doesnt exists");
      }})
      .catch(error => {
        res.status(400).send(error);
      });

  }
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
            token: token,
            customer_id : cus.customer_id, 
            customer : {
              name: cus.name ,
              email: cus.email,
              address_1: cus.address_1,
              address_2: cus.address_2,
              city: cus.city,
              region: cus.region,
              postal_code: cus.postal_code,
              country: cus.country,
              shipping_region_id: cus.shipping_region_id,
              day_phone: cus.day_phone,
              eve_phone: cus.eve_phone,
              mob_phone: cus.mob_phone
            }
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
