const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/HTL_MAIN_APP2", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Event = require("./event");
