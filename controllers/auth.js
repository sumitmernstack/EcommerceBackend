const User=require("../models/user");
const {  validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');

exports.signup=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user= new User(req.body)
   // console.log("res",user)
    user.save((err,user)=>{
        if(err){
            return res.status(400).
            json({err:"error to save data"})

        }
      res.json(user)
    })

   // res.send("hi every one");
}

exports.abc=(req,res)=>{
    res.json({mes:"hi"})
}

exports.signin=(req,res)=>{
    const {email,password}=req.body;

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err  || !user){
            return res.status(400).json({err:"email dosent exist"})
        }
        if(!user.autheticate(password)){
          return  res.status(401).json({err:"email and pass not match"})
        }
      
       const token = jwt.sign({ _id:user._id }, process.env.ECOMMERCE);
       res.cookie("token",token,{expire:new Date() +99999})
       const {_id,name,role}=user;
       return res.json({token,user:{_id,name,role}});

    })


}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({message:"user signout succesfully"})

}

//protected
exports.isSignedIn=expressjwt({
    secret: process.env.ECOMMERCE,
   userProperty:"auth",
   algorithms: ['HS256'],
  })


  exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED....."
      });
    }
    next();
  };

  exports.isAdmin=(req,res,next)=>{
      if(req.profile.role== 0){
        return res.status(403).json({error:"you are not admin........"})

      }
      next();
  }