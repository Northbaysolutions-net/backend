var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/check_auth', function(req, res, next) {
  res.json({
    success: true,
    message: 'Index page'
  });
});

module.exports = router;
