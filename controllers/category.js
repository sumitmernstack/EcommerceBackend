const category = require("../models/category")
const Category=require("../models/category")
const User=require("../models/user")

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).populate("category")
    .exec((err,cate)=>{
        if(err){
            return res.status(400).json({err:"no category"})
        }
        req.category=cate;
        next();
    })
}

exports.getCategory=(req,res)=>{
    return  res.json(req.category);
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,cate)=>{
        if(err ){
            return res.status(400).json({err:"category not saved"})
        }
        return res.json(cate);
    })
}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,cate)=>{
        if(err ){
            return res.status(400).json({err:"category not saved"})
        }
        return res.json(cate);
    })
}

exports.updateCategory=(req,res)=>{
    const category =req.category;
     category.name=req.body.name;
    category.save((err,cate)=>{
        if(err ){
            return res.status(400).json({err:"category not update"})
        }
        return res.json(cate);
    })
}

exports.removeCategory=(req,res)=>{
const category=req.profile;
category.remove((err,cate)=>{
    if(err ){
        return res.status(400).json({err:"category not removed"})
    }
    return res.json(cate,{message:"sucessfuly deleated"});
})
}