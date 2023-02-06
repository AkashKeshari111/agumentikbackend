const { Router } = require("express");

const bcrypt = require("bcrypt");
const dns = require("node:dns");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
var crypto = require("crypto");
const { AdminModel } = require("../Model/AdminModel");
const { authentication } = require("../Middleware/authentication");
const authorization = require("../Middleware/authorization");

const adminRouter = Router();


adminRouter.post("/admin/register", async (req, res) => {
  const {
    email,
    password,
    role,
    userId,
  } = req.body;


  const auth_user = await AdminModel.findOne({ email });

  if (auth_user) {
    return res.status(403).send({ msg: "User are already exists" });
  } else {
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          return res.status(501).send(err);
        }
        dns.lookup("augmentik.com", async (err, address, family) => {
          if (err) {
            return res.status(501).send(err);
          }
          const new_adminAuthUser = new AdminModel({

            email,
            password:hash,
            ip_address: address,
            role,
            userId,
           
          });

          await new_adminAuthUser.save();
          return res
            .status(201)
            .send({ msg: "Signup Successfully"});
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

adminRouter.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const validUser = await AdminModel.findOne({ email });
 
  if (validUser) {
    const userId = validUser._id;
    const hash = validUser.password;
    const role=validUser.role;
    try {
      await bcrypt.compare(password, hash, async function (err, result) {
        if (err) {
          return res.status(500).send(err)
        }
        if (result) {
          const token = jwt.sign({ userId }, "abcd",{ expiresIn: '24h' });
          return res.status(201).send({ "msg": "Login Success", token: token,role:role,userId});
        } else {
          return res.status(401).send({ "msg": "Login failed!" });
        }
      });
    } catch (err) {
      return res.status(401).send(err);
    }
  } else {
    return res.status(401).send({ "msg": "Login failed!" });
  }
});

adminRouter.patch("/admin/:id",authentication,authorization(["Admin"]), async (req, res) => {
  const { id } = req.params;
  const { email,password,role } = req.body;
  const auth_user = await AdminModel.findOne({ email });

  if (auth_user) {
  
    try {
      bcrypt.hash(password, 5, async function (err, hash) {
        if(err){
          res.status(500).send(err);
        }
      const updateAdminId = await AdminModel.updateOne(
        { _id: id },
        { $set: { email,password:hash,role } }
      );
      res.send({ msg: "Update AdminId", updateAdminId });
      })
    } catch (err) {
      res.send(err);
    }
  }
  else{
    res.status(403).send("user not exist")
  }
});

module.exports = adminRouter;