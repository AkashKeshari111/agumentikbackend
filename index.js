
const express=require("express");
require("dotenv").config();
const cors=require("cors");
const  connection  = require("./Config/db");
const homeRouter=require("./Router/Home.router")
const adminAuth=require("./Router/Admin.router")

const app=express();
app.use(cors());
app.use(express.json());
app.use("/",adminAuth);
app.use("/",homeRouter);



app.get("/",async(req,res)=>{
    return await res.send("Home Page")
})



const PORT=process.env.PORT || 8000;
app.listen(PORT,async()=>{

    try{
      await connection;
      console.log("MongoDb connected!") 
    }
    catch(err){
        console.log(err)
    }
     console.log(`Server listen at PORT no=> http://localhost:${PORT}`)
})