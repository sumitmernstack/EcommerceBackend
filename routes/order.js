const express=require("express")
const router = express.Router()
const {getProductById, updateStock}=require("../controllers/product")
const {getUserById,pushOrderInPurchageList}=require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth")
const { getOrderById, craeteOrder, getAllOrders,updateStatus,getOrderStatus }=require("../controllers/order")
router.param("userId",getUserById);
router.param("productId",getProductById);
router.param("orderId",getOrderById);

router.post("order/create/:orderId",isSignedIn,isAuthenticated,pushOrderInPurchageList,updateStock,craeteOrder)
router.get("order/all/:orderId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)
router.get("order/status/:orderId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)

router.put("order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)


module.exports=router;