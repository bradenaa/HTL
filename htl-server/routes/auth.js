require('dotenv').config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = require("../models");
const twitterAPI = require("twitter");
const oauth = require("oauth").OAuth;

const oa = new oauth(
  process.env.TWITTER_REQ_TOKEN_URL,
  process.env.TWITTER_ACCESS_TOKEN_URL,
  process.env.TWITTER_CLIENT_ID,
  process.env.TWITTER_CLIENT_SECRET,
  process.env.OAUTH_VERSION,
  process.env.TWITTER_CALLBACK_URL,
  process.env.OAUTH_ALGORITHM
);

router.get('/', (req, res, next) => {
  if (req.session.oauth.access_token) {
    res.send({message: "congrats you are signed in as: " + req.cookies.twitterAccessJwt});
  } else {
    res.send({message: "Hello, time to sign in!"})
  }
});

// First call to twitter to get the request token and secret, then
// store those in the session
router.get('/twitter', (req, res, next) => {
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error) {
      console.log(error)
      return next({
        status: 400,
        message: error.message
      })
    } else {
      req.session.oauth = {};
      req.session.oauth.token = oauth_token;
      req.session.oauth.token_secret = oauth_token_secret;

      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + oauth_token);
    }
  })
});

router.get('/twitter/callback', (req, res, next) => {
  if (req.session.oauth) {
    const oauth = req.session.oauth;
    // store the verifier in the session
    oauth.verifier = req.query.oauth_verifier;

    oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function(error, oauth_access_token, oauth_access_token_secret, results){

      if (error) {
        console.log("1" + error);
      } else {
        // set the twitterID from the results
        const twitterID = results.user_id;
        //Store the access token and secret in the session
        oauth.access_token = oauth_access_token;
        oauth.access_token_secret = oauth_access_token_secret;
        // console.log("results: " + results);

        // See if you can find a twitterID base on the results and
        // if not then create a new user with the results and
        // the access token and secret
        db.User.findOne({"twitter.id": twitterID}, function(err, user) {
          if (err) {
            return next({
              status: 400,
              message: err.message
            });
          }
          if (user) {
            console.log("user found: " + user);
          } else {
            var newUser = new db.User();
            newUser.twitter.id = twitterID;
            newUser.twitter.name = results.screen_name;
            newUser.twitter.username = results.screen_name;
            newUser.twitter.accessToken = oauth_access_token;
            newUser.twitter.accessTokenSecret = oauth_access_token_secret;

            newUser.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Saved new user to database");
              }
            });
          }
        });

          const jwtPayload = {
            twitterAccessToken: oauth_access_token,
            twittername: results.screen_name
          };

          const authJwtToken = jwt.sign(jwtPayload, process.env.jwtSecret);

          const cookieOptions = {
            httpOnly:true,
            expires:0
          }
          // store the JWT into a cookie, to grab from front end
          res.cookie('twitterAccessJwt', authJwtToken, cookieOptions)
          // redirect to the home route for now...
          res.redirect("/api/auth");
          console.log("This is the session object========");
          console.log(req.session);
          console.log("=================================")
          console.log("This is the cookie object========");
          console.log(req.cookies);
          console.log("=================================")
      }
    });

  } else {
    next({
      status: 400,
      message: error.message
    });
  }
});

module.exports = router;
