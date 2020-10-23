const mongoose= require("mongoose");
const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    price:Number,
    count:Number
})

const ProductCart=mongoose.model("ProductCart",ProductCartSchema);

const  OrderSchema= new mongoose.Schema({
products:[ProductCartSchema],
transation_id:{},
amount:{type:Number},
address:String,
status:{
    type:String,
    default:"Recived",
    enum:["Cancelled","Delivered","Shipped","Processing","Recived"]
},
updated:Date,
user:{
    type:ObjectId,
    ref:"User"
}
},{timestamps:true})

const Order=mongoose.model("Order",OrderSchema);

module.exports=(Order,ProductCart)