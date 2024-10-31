const mongoose = require("mongoose");


const connectDB = async ()=>{
  try{
   await mongoose.connect(process.env.DB_URI);
   console.log("connected to db")
  }
  catch(err){
    console.log("unable to to connnect to db", err);
    process.exit(1);
  }
}

module.exports = connectDB;