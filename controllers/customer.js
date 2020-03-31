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

  console.log (req.params.customer_id);
  if (!(req.params.customer_id) || (req.params.customer_id < 1))
    res.status(401).send("kindly pass valid customer_id");
  else{

    let credit_card = '';
    let address_1 = '';
    let address_2 = '';
    let city = '';
    let region = '';
    let postal_code = '';
    let country = ''
    let shipping_region_id = 1;
    let day_phone = '';
    let eve_phone='';
    let mob_phone='';
  
  
    if (req.body.credit_card)
      credit_card =  req.body.credit_card;
    if (req.body.address_1)
      address_1 = req.body.address_1;
    if (req.body.address_2)
      address_2 =  req.body.address_2;
    if (req.body.city)
      city= req.body.city;
    if (req.body.region)
      region= req.body.region;
    if (req.body.postal_code)
      postal_code= req.body.postal_code;
    if (req.body.country)
      country= req.body.country;
    if (req.body.shipping_region_id)
      shipping_region_id= req.body.shipping_region_id;
    if (req.body.day_phone)
      day_phone= req.body.day_phone;
    if (req.body.eve_phone)
      eve_phone= req.body.eve_phone;
    if (req.body.mob_phone)
      mob_phone= req.body.mob_phone;
  
    models.customer
      .update({
        credit_card: credit_card,
        address_1: address_1,
        address_2: address_2,
        city: city,
        region: region,
        postal_code: postal_code,
        country: country,
        shipping_region_id: shipping_region_id,
        day_phone: day_phone,
        eve_phone: eve_phone,
        mob_phone: mob_phone
      },
      { where: { customer_id : req.params.customer_id } })
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
