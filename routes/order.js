const express = require("express");
const router = express.Router();
require("dotenv").config();
const db = require('../models')


const createOrder=(req,res)=>{
    let object=req.body;
    console.log(object)
    return db.order.create({
        customer_id:object.order.customerId,
        order_data:new Date(),
        total_price:object.order.totalPrice


    }).then((orderResult)=>{
        console.log(object)
       return  object.orderDetail.map(order=>{
           console.log(orderResult)
            order.order_id=orderResult.order_id
        })

    }).then (results=>{
        console.log(results)

        return db.order_details.bulkCreate(object.orderDetail)
    }).then(()=>{
        res.json({
            message:"order placed successfully"
        })
        }).catch(error=>{
            res.json({
                error
            }).status(403)
    })
   

    


}

router.post("/order", function(req, res, next) {
  createOrder(req, res);
});

module.exports = router;