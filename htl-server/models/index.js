const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/htl-postNewDiscussion", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Event = require("./event");
module.exports.Discussion = require("./discussion");
module.exports.Comment = require("./comment");
module.exports.Reply = require("./reply");
