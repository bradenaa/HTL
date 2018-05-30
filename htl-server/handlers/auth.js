const request = require("request");
const jwt = require("jsonwebtoken");

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
            // return res.send(500, { message: err.message });
          return next({
            status: 500,
            message: err.message
          })
        }
        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
    });
}

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

        console.log(body);

        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        next();
    });
}

exports.login = function(req, res, next) {
  //handle if user wasn't passed
    if (!req.user) {
        return next({
          status: 401,
          message: 'User Not Authenticated'
        });
    }
    let { name, email, id } = req.user;
    // create token
    let token = jwt.sign({
      name,
      email,
      id
    }, process.env.JWT_SECRET,
    {
      expiresIn: 60 * 120
    });

    return res.status(200).json({
      name,
      email,
      id,
      token
    })

}