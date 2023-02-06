
const { AdminModel } = require("../Model/AdminModel");


const authorization=(permission_role)=>{
  return async function(req,res,next){
    {
      const {userId}= req.body;
     
      const user = await AdminModel.findOne({_id:userId}) 
      // console.log(user)
      const Role = user.role;
      // console.log(Role)
          if(permission_role.includes(Role)){
              next()
          }
          else{
              res.status(403).send("Denied Permission")
          }
      }
  }
}

module.exports=authorization;