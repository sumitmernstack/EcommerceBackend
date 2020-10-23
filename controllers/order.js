const Order = require("../models/order")

exports.getOrderById=(req,res,next,id)=>{
    order.findById(id)
    .populate("products.product","name price")
    .exec((err,ord)=>{
        if (err) {
            return res.status(400).json({err:"order not found"})
        }
        req.order=ord;
       // return res.json(order)
       next();
    })
}

exports.craeteOrder=(req,res)=>{
req.body.order.user=req.profile;
const order=new Order(req.body,order);
order.save((err,ord)=>{
    if (err) {
        return res.status(400).json({err:"order not save"})
    }
    return res.json(order)
})
}


exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if (err) {
            return res.status(400).json({err:"order not save"})
        }
        return res.json(order)
    })
       
}

   
exports.getOrderStatus=(req,res)=>{
   
 res.json(Order.schema.path("status").enumValue)
       
} 




exports.updateStatus=(req,res)=>{
   Order.update({_id:req.body.orderId},
    {$set:{status:req.body.status}},
   (err,order)=>{
    if (err) {
        return res.status(400).json({err:"canot update order status"})
    }
   }
   )
   res.json(order); 
}

    

