const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  twitter: {
    id: String,
    name: String,
    username: String,
    accessToken: String,
    accessTokenSecret: String
  }
})


const User = mongoose.model("User", userSchema);

module.exports = User;
