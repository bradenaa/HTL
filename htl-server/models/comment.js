const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  showReplyList: {
    type: Boolean,
    default: false
  },
  showReplyForm: {
    type: Boolean,
    default: false
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ]
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
