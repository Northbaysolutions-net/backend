const Order = require('../models').order;
const Customer = require('../models').customer;

class CustomersController {
  static async updateUserInformation(req, res, next) {
    let object = req.body;
    Customer.update(object.newData, { where: { name: object.name } })
      .then(response => {
        res.json({
          userId: response[1],
          message: 'User info updated successfully'
        });
      })
      .catch(error => {
        res.status(401).json({
          error: error,
          message: 'Error Updating User Information'
        });
      });
  }

  static async getUserInformation(req, res, next) {
    let user = req.params.user;
    Customer.findOne({
      where: {
        name: user
      }
    })
      .then(response => {
        delete response.password;
        res.json({
          user: {
            credit_card: response.credit_card,
            address_1: response.address_1,
            address_2: response.address_2,
            city: response.city,
            region: response.region,
            postal_code: response.postal_code,
            country: response.country,
            mob_phone: response.mob_phone
          }
        });
      })
      .catch(error => {
        res.status(400).json({
          error: error,
          message: 'Error Fetching User Information'
        });
      });
  }
}

module.exports = CustomersController;
