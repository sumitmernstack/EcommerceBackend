require('dotenv').config()
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors = require('cors');
const  cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') 
const authRoute=require("./routes/auth")
const userRoute=require("./routes/user")
const categoryRoute=require("./routes/category")
const productRoute=require("./routes/product")
const orderRoute=require("./routes/order")
//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",orderRoute);
//dbconnection 
mongoose.connect(process.env.db,
   { 
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex:true,
   useFindAndModify:true
 })
.then(()=>console.log("db connected"))
.catch(error=>console.log(error));

 const PORT=process.env.port;
 

 app.listen(PORT,()=>{console.log(`server started at port no ${PORT}...`) })