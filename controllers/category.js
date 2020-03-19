var models = require("../models");

exports.getCategory = (req, res) => {
  models.category
    .findAll({
      include: [
        { model: models.department, attributes: ["name", "description"] }
      ]
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
