const express = require("express");
const router = express.Router();
const {login}=require('../controllers/authenticationController')

require("dotenv").config();

router.post("/login", function(req, res, next) {
  login(req, res);
});

module.exports = router;
