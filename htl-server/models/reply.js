const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  replyText: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }
}, { timestamps: true} )

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
