const express=require("express");
const router = express.Router();
const {isSignedIn, isAuthenticated}=require("../controllers/auth");
const {getUserById,getUser,getAllusers,updateUser,userPurchageList,pushOrderInPurchageList}=require("../controllers/user");
router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.get("/users", getAllusers);
router.put("/users/:userId",isSignedIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchageList);
router.put("/users/:userId",isSignedIn,isAuthenticated,pushOrderInPurchageList);
module.exports=router;
