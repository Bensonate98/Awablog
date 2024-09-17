const mongoose = require("mongoose");
const { Schema } = require("mongoose");

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
    required: [true, "Enter a strong password"],
    minLength: [6, "Password too short"],
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;