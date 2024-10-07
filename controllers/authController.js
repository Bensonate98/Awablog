const User = require("../models/user");
const handleError = require("../utils/errorHandler"); //custom funstions for error handling

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
    res.status(201).json({id: user._id, username: user.username, email: user.email, message: "Registration successful"});
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
  const{email, password} = (req.body);
  const user = await User.login(email, password);
  console.log(user);
}

module.exports = { signup_get, signup_post, login_get, login_post};
