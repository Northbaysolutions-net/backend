var models = require("../models");

exports.insertOrder = (req, res) => {
  let order_id = 0;

  let {customer_id, totalAmmount} = req.body;
  let {address_1, address_2, city, region, postal_code, country} = req.body.customer_address;

  models.order
    .create({
      customer_id: customer_id,
      price: totalAmmount,
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
            address_1,
            address_2,
            city,
            region,
            postal_code,
            country
          },
          { where: { customer_id } })
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
