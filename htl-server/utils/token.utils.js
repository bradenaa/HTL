var jwt = require('jsonwebtoken');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, process.env.JWT_SECRET,
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      return res.status(200).json(JSON.stringify(req.user));
  }
};
