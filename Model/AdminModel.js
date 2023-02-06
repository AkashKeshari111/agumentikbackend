const {Schema,model}=require("mongoose");


const adminSchema=new Schema({
   
   email:{type:String,required:true},
   password:{type:String,required:true},
   role:{type:String,default:"user"},
   userId:{type:String}

},{
    timestamps:true
});


const AdminModel=model("admin",adminSchema);



module.exports={AdminModel}