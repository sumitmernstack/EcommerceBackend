const User=require("../models/user");
const Order=require("../models/order");
const product = require("../models/product");
exports.getUserById=(req,res,next,id) => {
    User.findById(id)
    .exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"no such user found "
            })
        }
        req.profile=user;
        next();
    });
};

exports.getUser=(req,res)=>{
   req.profile.salt=undefined;
   req.profile.encry_password=undefined;
   return  res.json(req.profile); 
};


exports.getAllusers=(req,res)=>{
    User.find().exec((err,user)=>{
        if(err){
            return res.status(400).json({err:"unable to find user"})
        }
       
      return   res.send(user);
    })
}

exports.updateUser=(req,res)=>{ 
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({err:"failed to update & you are not authorised user"})
            }
            user.salt=undefined;
            user.encry_password=undefined;
            return res.send(user);
        }
        )
}

exports.userPurchageList=(req,res)=>{
 Order.find({user:req.profile._id})
 .populate("user","_id name")
 .exec((err,order)=>{
     if(err){
            return res.status(400).json({err:"no order in this acc..."})
 }
 return res.json(order)
 })

}

exports.pushOrderInPurchageList=(req,res,next)=>{
    let purchage=[];
    req.body.order.products.forEach(product=>{
        purchage.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transation_id:req.body.order.transation_id
            
        })
    })
    User.findOneAndUpdate({_id:req.profile._id},
        {$push:{ purchases:purchage}},
        {new:true},
        (err,purch)=>{
            if(err){
            return res.status(400).json({err:"not able to save purchage"})
            }
            return res.json(purch);
        })
        next();
}