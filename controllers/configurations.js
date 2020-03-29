const Attribute = require('../models').attribute;
const AttributeValue = require('../models').attribute_value;

class ConfigurationsController {
  static async getConfigurations(req, res, next) {
    Attribute.findAll({
      include: [{ model: AttributeValue, required: true }]
    })
      .then(attribute => {
        res.json(attribute);
      })
      .catch(error => {
        res.status(400).json({
          error: error,
          success: false,
          message: 'Invalid Request! Please check the request'
        });
      });
  }
}

module.exports = ConfigurationsController;
