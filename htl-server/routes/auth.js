var express = require('express');
var router = express.Router();
var { generateToken, sendToken } = require('../utils/token.utils');
var passport = require('passport');
var request = require('request');
const { twitterRequestToken, twitterAccessToken, login  } = require("../handlers/auth");
require('../passport')();

router.post('/auth/twitter/reverse', twitterRequestToken);

router.post('/auth/twitter',
  twitterAccessToken,
  passport.authenticate('twitter-token', {session: false}),
  login,
  generateToken,
  sendToken
);

router.post('/auth/facebook',
  passport.authenticate('facebook-token', {session: false}),
  login,
  generateToken,
  sendToken
);

router.post('/auth/google',
  passport.authenticate('google-token', {session: false}),
  login,
  generateToken,
  sendToken
);

module.exports = router;
