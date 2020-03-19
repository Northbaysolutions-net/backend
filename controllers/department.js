var models = require('../models'); 

exports.getDepartment= (req, res) =>{
  models.department.findAll()
  .then( response => {
    res.status( 200 ).json( response )
  })
  .catch( error => {
    res.status( 400 ).send( error )
  })
};
