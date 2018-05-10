'use strict';

require('./mongoose')();
var passport = require('passport');
var TwitterTokenStrategy = require('passport-twitter-token');
var User = require('mongoose').model('User');
var FacebookTokenStrategy = require('passport-facebook-token');
var GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {

    passport.use(new TwitterTokenStrategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,
            consumerSecret: process.env.TWITTER_CLIENT_SECRET,
            includeEmail: true
        },
        function (token, tokenSecret, profile, done) {
            User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
                return done(err, user);
            });
        }));

    passport.use(new FacebookTokenStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));

    passport.use(new GoogleTokenStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));
};
