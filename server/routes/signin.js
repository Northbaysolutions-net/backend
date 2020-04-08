var express = require("express");
var router = express.Router();
const SigninController = require("../controllers/signin");

router.post("/", SigninController.signin);

const signinRouter = router;

module.exports = { signinRouter };
