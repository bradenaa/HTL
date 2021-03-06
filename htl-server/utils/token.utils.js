// This logic is unused at this point, as the token handling is being taken care of directly in handlers/auth.js

var jwt = require('jsonwebtoken');

var createToken = function(auth) {
  console.log("ct: ", auth);
    return jwt.sign({
            id: auth._id
        }, process.env.JWT_SECRET,
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
    console.log("gt: ", req.auth);
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      console.log(req.user);
      return res.status(200).json(JSON.stringify(req.user));
  }
};
