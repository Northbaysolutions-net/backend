const Order = require('../models').order;
const OrderDetail = require('../models').order_detail;

class OrdersController {
  static async placeOrder(req, res, next) {
    let object = req.body;
    try {
      let orderResult = await Order.create({
        customer_id: object.order.customerId,
        order_date: new Date().toISOString(),
        total_price: object.order.totalPrice
      });
      object.orderDetail.map(order => {
        order.order_id = orderResult.order_id;
      });
      let orderDetailResult = await OrderDetail.bulkCreate(object.orderDetail);
      res.json({
        success: true,
        message: 'Order Successfully Placed'
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Error'
      });
    }
  }
}

module.exports = OrdersController;
