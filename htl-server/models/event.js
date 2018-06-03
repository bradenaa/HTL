const mongoose = require("mongoose");
const User = require("./user")

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 160
    },
    neighborhood: {
      type: String,
      required: true,
      maxLength: 160
    },
    date: {
      type: Date,
      default: Date.now
    },
    userCreated: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    usersAttending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ]
  },
  {
    timestamps: true
  }
);

// eventSchema.pre("remove", async function(next){
//   try {
//     // find a username
//     let user = await User.findById(this.user);
//     // remove the id of the message from their messages list
//     user.events.remove(this.id);
//     // save that user
//     await user.save();
//     // return next
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// })

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
