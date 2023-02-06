const {Router}=require("express");
const { HomeModel } = require("../Model/Home.model");
const authorization = require("../Middleware/authorization");
const { authentication } = require("../Middleware/authentication");



const app=Router();


app.get("/home",async(req,res)=>{

       try{
            const getData=await HomeModel.find({});
            res.status(200).send(getData);



       }
       catch(err){
           res.status(500).send({msg:err})
       }
})


app.post("/home",authentication,authorization(["Admin"]),async(req,res)=>{
    const {userId}=req.body;
        
    try{
        const data = HomeModel({...req.body,userId})
        await data.save();
        res.status(201).send({"msg":"posted"})
    }
    catch(err){
        res.status(500).send({msg:err})
    }

})


app.patch("/home/:id",authentication,authorization(["Admin"]),async(req,res)=>{
    const {id}=req.params;
    
    const findId = await HomeModel.findOne({ _id:id });
    if(findId){
        try{
            const updateContent = await HomeModel.updateOne(
                { _id: id },
                { $set: {...req.body} }
              );
              res.send({ msg: "Update Content", updateContent });
        }
        catch(err){
            res.status(500).send({msg:err});
        }
    }

})

module.exports=app;