const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }
}, { timestamps: true} )

// var autoPopulate = function(next) {
//   this.populate({
//     path: 'author',
//     select: 'displayName'
//   });
//   next();
// }
//
// replySchema
//   .pre('findById', autoPopulate)
//   .pre('find', autoPopulate)
//   .pre('findOne', autoPopulate);

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
