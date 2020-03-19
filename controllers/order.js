var models = require("../models");

exports.insertOrder = (req, res) => {
  models.order
    .create({
      customer_id: req.body.customer_id,
      price: req.body.price,
      placed_on: new Date()
    })
    .then(response => {
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(400).send("Error in placing new order");
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
