
const Product=require("../models/product")
const formidable = require('formidable');
const  _ = require('lodash');
const fs=require("fs");
const { sortBy } = require("lodash");
const product = require("../models/product");

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id).populate("category").exec((err,prod)=>{
        if(err){
            return res.status(400).json({err:"unable to find product"})
        }
        req.product=prod;
    })
    next();
}

exports.getAllProducts=(req,res)=>{
    //if there is any query from front end and it has  onject limit
    let limit=req.query.limit ? parseInt(req.query.limit): 8;
    let sortBy=req.query.sortBy ? req.query.sortBy:"_id"
    Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({err:"no product found "})
        }
        return res.send(product);
    })
}

exports.updateStock=(req,res,next)=>{
    const myOperation= req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
            update:{$inc:{stock:-prod.count, sold:+prod.count}}            }
        }
    })

    product.bulkWrite(myOperation, {}, (err,products)=>{
        if(err){
            return res.status(400).json({err:"no product found "})
        }
        return res.send(product);
    })

}

exports.getProduct=(req,res)=>{
    req.product.photo=undefined;
    return  res.json(req.product);
}

exports.createProduct=(req,res)=>{
  //  three parameters are err,fields(name,price....) and files
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{


        if(err){
            return res.status(400).json({err:"problem with image "})
        }
         
        //destructure the fields
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }
        let product=new Product(fields);

        if(files.photo){
            if(files.photo.size >300000){
                return res.status(400)
                .json({err:"file size too big"})
            }
            product.photo.data=fs.readFileSync(files.photo.path);
             product.photo.contentType=files.photo.type;
        }
        console.log(product);
        product.save((err,prod)=>{
            if(err){
                return res.status(400).json({err:"failed while saving to db "})
            }
            res.json(product)
        })        

    });
}


exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("contentType",req.product.photo.contentType)
        return res.send (req.product.photo.data);

    }
    next();
}

//update
exports.updateProduct=(req,res)=>{
    name=req.body
Product.findByIdAndUpdate(
    {id:req.product._id},
    {$set:{name:req.body.name}},
    {new:true,useFindAndModify:false},
    (err,caet)=>{
        if(err){
            return res.status(400).json({err:"failed to update category"})
        }
      
        return res.send(cate);
    }
    )

}

exports.removeProduct=(req,res)=>{
    const product=req.profile;
    product.remove((err,cate)=>{
        if(err ){
            return res.status(400).json({err:"product not removed"})
        }
        return res.json(cate,{message:"sucessfuly deleated"});
    })
    }

    exports.updateProduct=(req,res)=>{
        let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{


        if(err){
            return res.status(400).json({err:"problem with image "})
        }
         
        //destructure the fields
    
        let product=  req.product;
        product= _.extend(product,fields)

        if(files.photo){
            if(files.photo.size >300000){
                return res.status(400)
                .json({err:"file size too big"})
            }
            product.photo.data=fs.readFileSync(files.photo.path);
             product.photo.contentType=files.photo.type;
        }
        console.log(product);
        product.save((err,prod)=>{
            if(err){
                return res.status(400).json({err:" updation failed while saving to db "})
            }
            res.json(product)
        })        

    });
        
        }
    
