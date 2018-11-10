// require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer jdfsdfisd
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if (decoded) {
        return next();
      } else {
        console.log(err);
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    });
  } catch (err) {
    console.log(err);
    return next({
      status: 401,
      message: "Please log in first"
    })
  }
 };

 // Checks if the userID in the decoded JWT in the header from the client,
 // which was initially issued by the back end, matches that of the userID passed in the http request
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if (decoded && decoded._id === req.params.userID) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch (error) {
    return next({
      status: 401,
      message: "Unauthorized"
    })
  }
};
