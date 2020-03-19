const { Op } = require("sequelize");
const db = require("../models/index");
require("dotenv").config();
const {encrypt}= require('../utils/encryption')
const Customer = require("../models").customer;
let jwt = require("jsonwebtoken");



const createUser = (req, res) => {
    if (!req.body)
    {
        throw err
    }
    let { userName, password } = JSON.parse(JSON.stringify(req.body));
  
    const userNameEncrypted = encrypt(userName);
    const passwordEncrypted = encrypt(password);
  
    return db.customer
      .create({
        name: userNameEncrypted,
        password: passwordEncrypted,
        email: req.body.email,
        credit_card:req.body.credit_card,
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region: req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id,
        mob_phone:req.body.mob_phone
  
  
      })
      .then(result => {
        res.status(200).json({
          results: result
        });
      }).catch((err)=>{
          res.status(400).json({
              error:err
          })
  
      })
  };

  function login(req, res) {
    
    if (req.body.name && req.body.pass) {
      return Customer.findOne({
        where: {
          [Op.and]: [{ name: req.body.name }, { password: req.body.pass }]
        }
      })
        .then(result => {
          if (result) {
            let token = jwt.sign(
              { username: req.body.name },
              process.env.SECRET,
              {
                expiresIn: "24h" // expires in 24 hours
              }
            );
  
            res.json({
              success: true,
              message: "Authentication successful!",
              token: token
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

  module.exports={createUser, login}