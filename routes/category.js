const express=require("express")
const router = express.Router()
const {getCategoryById,getCategory,removeCategory,createCategory,getAllCategory,updateCategory}=require("../controllers/category");
const {getAllusers,getUserById,getUser}=require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth")

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//router.get("/category/:categoryId",isSignedIn,isAuthenticated,getCategory)
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory)
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)

router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)


module.exports=router;