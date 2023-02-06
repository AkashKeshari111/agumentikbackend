require("dotenv").config()
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.headers?.token.split(" ")[1];
    console.log(token)
    try{
       const decoded = jwt.verify(token,"abcd");
        req.body.userId = decoded.userId
        console.log(decoded)
        next()
    }
    catch(err){
        res.status(500).send(err)
    }
}


module.exports={authentication}