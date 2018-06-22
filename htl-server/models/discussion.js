const mongoose = require("mongoose");
const User = require("./user")

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160
    },
    post: {
      type: String,
      required: true,
      maxLength: 300
    },
    date: {
      type: Date,
      default: Date.now
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    upVotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      },
    ]
  },
  {
    timestamps: true
  }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
