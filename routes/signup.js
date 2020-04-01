const express = require("express");
const router = express.Router();
const {createUser} =require('../controllers/authenticationController')

router.post("/signup", (req, res) => {
  createUser(req, res);
});

module.exports = router;
