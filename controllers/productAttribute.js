var models = require('../models'); 

exports.getProduct_attribute = (req, res) => {
  models.product_attribute.findAll( { include: [
    {model: models.attribute_value , attributes: ["value"],
    include: [{
      model: models.attribute, attributes: ["name"]
       }],
  },
    {model: models.product}
  ],
})
  .then( response => {
    res.status( 200 ).json( response )
  })
  .catch( error => {
    res.status( 400 ).send( error )
  })
};


