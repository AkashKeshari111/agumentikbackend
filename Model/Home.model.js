const mongoose=require("mongoose");


const homeSchema=new mongoose.Schema({
      userId:{type:String},
      section1:{
        img1:{type:String},
        h1:{type:String},
        text1:{type:String},
        l1:{type:String},
        l2:{type:String},
        l3:{type:String},
        s1:{type:String},
        i1:{type:String},
        i2:{type:String},
      },

      section2:{
    
      }
},{
  timestamps:true
})

const HomeModel=mongoose.model("home",homeSchema);


module.exports={HomeModel}