var models = require("../models");

exports.insertOrder = (req, res) => {
  let order_id = 0;

  models.order
    .create({
      customer_id: req.body.customer_id,
      price: req.body.totalAmmount,
      placed_on: new Date()
    })
    .then(response => {
      if (response) {
        order_id = response.order_id;
        let products = JSON.parse(req.body.products);
        let productorders = products.map(product => {
          let item = {};
          item.product_id = product.product_id;
          item.order_id = order_id;
          item.quantity = parseInt(product.quantity) ;
          return item;
        });
        models.product_order
        .bulkCreate(productorders)
        .then(responsePO => {  
          if (responsePO) {
            models.customer
            .update({
            address_1: req.body.customer_address.address_1,
            address_2: req.body.customer_address.address_2,
            city: req.body.customer_address.city,
            region: req.body.customer_address.region,
            postal_code: req.body.customer_address.postal_code,
            country: req.body.customer_address.country
          },
          { where: { customer_id : req.body.customer_id } })
          .then(cus => {
            if (cus) {
              res.status(200).json({order_id : order_id});
            } else {
              res.status(400).send("Error in updating address of Customer");
          }})
          }
          else 
          {
            res.status(400).send("Error in placing new products along order");
          }
      
        });
      } else {
        res.status(400).send("Error in placing new order");
      }
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
