const db = require("../models");

const createOrder = (req, res) => {
  let object = req.body;
  return db.order
    .create({
      customer_id: object.order.customerId,
      order_data: new Date(),
      total_price: object.order.totalPrice
    })
    .then(orderResult => {
      return object.orderDetail.map(order => {
        order.order_id = orderResult.order_id;
      });
    })
    .then(() => {
      return db.order_details.bulkCreate(object.orderDetail);
    })
    .then(() => {
      res.json({
        message: "order placed successfully"
      });
    })
    .catch(error => {
      res
        .json({
          error
        })
        .status(403);
    });
};

module.exports=createOrder
