const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const {handleError, generateToken} = require("../utils/authFunc"); //custom funstions for error handling

const signup_get = (req, res)=>{
  res.status(200).render("signup", {title: "signup"});
}
//Signup(registration controller)
const signup_post = async (req, res)=>{
  if(req){
    console.log("new request")
  }
  const userData = req.body
  try{
    const user = await User.create(userData);
    res.redirect("/login")
  }
  catch(err){
    const error = handleError(err); //handleError() is a custom utiltity function
    res.status(400).json(error);
  }
}

const login_get = (req, res)=>{
  res.status(200).render("login")
}
const login_post = async (req, res)=>{
  console.log("Login route called");
  try{
    const{ email, password } = (req.body);
    if(email === process.env.ADMIN_EMAIL && await bcrypt.compare(password, process.env.ADMIN_PASSWORD)){
      const adminToken = jwt.sign({role: "admin"}, `${process.env.JWT_SECRET}`, {expiresIn: "1h"});
      res.cookie("adminToken", adminToken, {
        httpOnly: true, 
        maxAge: 3600000, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      return res.status(200).redirect("/blogs/create");
      
    }
    // console.log("about to login user")
    //   const user = await User.login(email, password);
    //   const token = generateToken(user);
    //   res.cookie("jwtToken", token, {
    //     httpOnly: true,
    //     maxAge: 3600000,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "lax"
    //   });
    //   return res.redirect("/");
  }
  catch(err){
      const error = handleError(err); //handleError() is a custom utiltity function
      return res.status(400).json(error);
  }
}
module.exports = { signup_get, signup_post, login_get, login_post };
