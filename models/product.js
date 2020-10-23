const mongoose= require("mongoose");
const {ObjectId}=mongoose.Schema;
const  productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    price:{
        type:Number,
        required:true,
        maxlength:25,
        trim:true,
    },
    category:{
        type:ObjectId,
        ref: "Category"

    },
    stock:{
        type:Number,
  
    },
    sold:{
        type:Number,
        default:0
       
    },
    photo:{
        data: Buffer,
        contentType:String
    }
},{timestamps:true})


module.exports=mongoose.model("Product",productSchema);