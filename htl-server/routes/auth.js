var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
const { loginRequired } = require("../middleware/auth");

const { twitterRequestToken, twitterAccessToken, login, promoHandler  } = require("../handlers/auth");
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

router.put('/users/:userID/promo/:promoCode',
  loginRequired,
  promoHandler
)

module.exports = router;
