var models = require("../models");

exports.getAttribute = (req, res) => {
  models.attribute
    .findAll()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
