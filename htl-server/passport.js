'use strict';

const db = require("./models");
var passport = require('passport');
var TwitterTokenStrategy = require('passport-twitter-token');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {

    passport.use(new TwitterTokenStrategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            includeEmail: true
        },
        function (token, tokenSecret, profile, done) {
            db.User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
              let newUser = {};
              newUser.displayName = profile.displayName;
              newUser.email = user.email;
              newUser._id = user._id;
              newUser.hasPromo = user.hasPromo;

              return done(err, newUser);
            });
        }));

    passport.use(new FacebookTokenStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            db.User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
              let newUser = {};
              newUser.displayName = profile.displayName;
              newUser.email = user.email;
              newUser._id = user._id;
              newUser.hasPromo = user.hasPromo;

              return done(err, newUser);
            });
        }));

    passport.use(new GoogleTokenStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            db.User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
              let newUser = {};
              newUser.displayName = profile.displayName;
              newUser.email = user.email;
              newUser._id = user._id;
              newUser.hasPromo = user.hasPromo;

              return done(err, newUser);
            });
        }));
};
