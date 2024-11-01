const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Enter a valid username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Enter a valid email address"],
    unique: true,
    lowercase: true
  },
  
  password: {
    type: String,
    required: [true, "Enter a password"],
    minLength: [6, "Password too short"],
  }
});

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({"email": email});
    if(!user){
      throw Error("Invalid credentials");
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      throw Error("Invalid credentials");
    }
    return user;
  }

userSchema.pre("save", async function (){
  const saltRounds = 15;

  try{
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  } catch(err){
    console.log(`Error from password hashing ${err}`);
  }
})


const User = mongoose.model("user", userSchema);
module.exports = User;

