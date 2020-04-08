require("dotenv").config();
var express = require("express");
var router = express.Router();
const SignupController = require("../controllers/signup");

router.post("/", SignupController.signup);

const signupRouter = router;

module.exports = { signupRouter };
