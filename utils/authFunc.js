const jwt = require("jsonwebtoken");
const User = require("../models/user");

const handleError = (err)=>{
  let error = {username: "", email: "", password: ""};
  if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
      error[properties.path] = properties.message;
    }) 
  }

  if(err.code === 11000 && err.keyValue.username){
    error["username"] = "Username already exist";
    delete error.email;
    delete error.password;
  }
  if(err.code === 11000 && err.keyValue.email){
    error["email"] = "Email already exist";
    delete error.username;
    delete error.password;
  }
  if(err.message.includes("Invalid credentials")){
    error = {error: "Invalid credentials"};
  }
  return error;
}

const generateToken = (user)=>{
  const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  return token;
}


module.exports = {handleError, generateToken};