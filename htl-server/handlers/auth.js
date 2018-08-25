const request = require("request");
const jwt = require("jsonwebtoken");
const db = require("../models");

/**
* Front end calls this route then the request token call to the Twitter API is initialized
* Creates JSON object
**/
exports.twitterRequestToken = function(req, res) {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
            consumer_key: process.env.TWITTER_CLIENT_ID,
            consumer_secret: process.env.TWITTER_CLIENT_SECRET,
        }
    }, function (err, r, body) {
        if (err) {
          return next({
            status: 500,
            message: err.message
          })
        }
        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
    });
}

/**
* Front end calls this route then the access token call to the Twitter API is initialized
* Sets headers to be the appropriate token and secret
* Calls next to move to passport strategy
**/
exports.twitterAccessToken = (req, res, next) => {
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            consumer_key: process.env.TWITTER_CLIENT_ID,
            consumer_secret: process.env.TWITTER_CLIENT_SECRET,
            token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
        if (err) {
            return next({
              status: 500,
              message: err.message
            });
        }
        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;
        next();
    });
}

exports.login = function(req, res, next) {
  // Handle if user wasn't passed in previous step
    if (!req.user) {
        return next({
          status: 401,
          message: 'User Not Authenticated'
        });
    }
    // Create JWT token
    let { displayName, email, id, hasPromo } = req.user;
    let token = jwt.sign({
      displayName,
      email,
      id,
      hasPromo
    }, process.env.JWT_SECRET,
    {
      expiresIn: 60 * 120
    });
    // pass the authenticated user and token to be handled by the front end
    return res.status(200).json({
      displayName,
      email,
      id,
      hasPromo,
      token
    })
}

exports.promoHandler = async function(req, res, next){
  try {
    // Find user by ID
    let foundUser = await db.User.findById(req.params.userID);
    // If user promo correct, then update profile and save
    if (req.params.promoCode === 'htl') {
      foundUser.hasPromo = true;
      await foundUser.save();

      // Create new token and send to frontend
      let { displayName, email, hasPromo } = foundUser;
      let id = foundUser._id;
      let token = jwt.sign({
        displayName,
        email,
        id,
        hasPromo
      }, process.env.JWT_SECRET,
      {
        expiresIn: 60 * 120
      });
      return res.status(200).json({
        displayName,
        email,
        id,
        hasPromo,
        token
      })
    }
    // Handle if promo code is incorrect
    return next({
      status: 400,
      message: 'This promo code is not correct'
    })
  } catch(err) {
    return next(err)
  }
}
