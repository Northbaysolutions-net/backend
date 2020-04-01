let jwt = require('jsonwebtoken');
require('dotenv').config()
let checkToken = (req, res, next) => {
    console.log(req.body)
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    console.log(token);
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.log(err,decoded,process.env.SECRET)
      if (err) {
        return res.send(403)
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}