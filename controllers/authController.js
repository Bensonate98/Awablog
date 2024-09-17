const User = require("../models/user");

const signup_get = (req, res)=>{
  res.status(200).send("signup in thisform");
}


module.exports = { signup_get };
