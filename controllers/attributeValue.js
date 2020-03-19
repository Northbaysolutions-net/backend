var models = require("../models");

exports.getAttribute_value = (req, res) => {
  models.attribute_value
    .findAll({ include: [{ model: models.attribute, attributes: ["name"] }] })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
