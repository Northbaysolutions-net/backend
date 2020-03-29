const CustomersController = require('../controllers/customer');
const { checkToken } = require('../middleware/tokenAuth');
var express = require('express');
var router = express.Router();

router.put(
  '/update-user-information/',
  checkToken,
  CustomersController.updateUserInformation
);
router.get(
  '/get-user-information/:user',
  checkToken,
  CustomersController.getUserInformation
);

const customersRouter = router;

module.exports = { customersRouter };
