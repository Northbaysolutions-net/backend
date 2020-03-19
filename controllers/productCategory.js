var models = require('../models'); 

exports.getProduct_category = (req, res) => {
  models.product_category.findAll( { include: [
    {model: models.category ,  attributes: ["name", "description"],
    include: [{
      model: models.department,  attributes: ["name", "description"]
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

