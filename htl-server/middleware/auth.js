// require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer jdfsdfisd
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      console.log(decoded);
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

 // make sure we get the correct user - authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if (decoded && decoded.id === req.params.id) {
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
