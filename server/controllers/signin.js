const authService = require("../services/auth");

class SigninController {
  static async signin(req, res) {
    console.log(req.body);
    await authService
      .authenticate(req.body)
      .then(token => {
        res.send({
          success: true,
          data: { token }
        });
      })
      .catch(err => {
        res.send({
          success: false,
          message: err.message
        });
      });
  }
}

module.exports = SigninController;
