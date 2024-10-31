const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next)=>{
  const token = req.cookies.jwtToken;
  const adminToken = req.cookies.adminToken;

  if(token){
    try{
      const verifiedToken = await jwt.verify(token, `${process.env.JWT_SECRET}`)
      next();
    }
    catch(err){
      res.status(401).redirect("/login");
    }
  }
  if(adminToken){
    try{
      const verifyAdminToken = await jwt.verify(adminToken, `${process.env.JWT_SECRET}`)
      next();
    }catch(err){
      res.status(401).redirect("/login");
    }
  }
  else{
    res.status(401).redirect("/login");
  }
}

module.exports = {verifyUser};