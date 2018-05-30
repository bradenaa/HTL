var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
const { twitterRequestToken, twitterAccessToken, login  } = require("../handlers/auth");
require('../passport')();

router.post('/twitter/reverse', twitterRequestToken);

router.post('/twitter',
  twitterAccessToken,
  passport.authenticate('twitter-token', {session: false}),
  login
);

router.post('/facebook',
  passport.authenticate('facebook-token', {session: false}),
  login
);

router.post('/google',
  passport.authenticate('google-token', {session: false}),
  login
);

module.exports = router;
