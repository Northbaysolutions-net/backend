var models = require("../models");
var db = require("../models/index")

exports.getAttribute_value = (req, res) => {

  let search= '%%';
  if (req.query.name) 
    search = req.query.name.toLowerCase();

  models.attribute_value
    .findAll({ 
      attributes: ["value" , "attribute_value_id"],
      include: [{ model: models.attribute, attributes: [],
        where: db.sequelize.where( db.sequelize.fn('lower', db.sequelize.col('name')), search ) }],
     
   })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
