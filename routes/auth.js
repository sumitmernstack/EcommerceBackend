const express=require("express")
const router = express.Router()
const {signup,abc,signin,signout,isSignedIn} =require("../controllers/auth")
const { check, validationResult } = require('express-validator');


router.post("/signup",[
    check("name","must be at least 3 char").isLength({min:3}),
    check("lastname","must be at least 3 char").isLength({min:3}),
    check("email","must be valid email").isEmail(),
    check("password","must be at least 6 char").isLength({min:6}),

],signup);


router.post("/signin",[
    
    check("email","must be valid email").isEmail(),
    check("password","must be at least 6 char").isLength({min:6}),

],signin);

router.get("/signout",signout);


router.get("/isSignedIn",isSignedIn, (req,res)=>{
    // res.send("its a protected route");
    // req.auth->>>>>>>it return us _id and iat value of a sinedin user.
    res.json(req.auth);
 });

router.get("/abc",abc);
module.exports=router;