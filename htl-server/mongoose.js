'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

    // var db = mongoose.connect('mongodb://localhost:27017/htl-postNewDiscussion');

    // var UserSchema = new Schema({
    //     email: {
    //         type: String, required: true,
    //         trim: true, unique: true,
    //         match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //     },
    //     facebookProvider: {
    //         type: {
    //             id: String,
    //             username: String,
    //             token: String
    //         },
    //         select: false
    //     },
    //     twitterProvider: {
    //         type: {
    //             id: String,
    //             username: String,
    //             token: String
    //         },
    //         select: false
    //     },
    //     googleProvider: {
    //         type: {
    //             id: String,
    //             username: String,
    //             token: String
    //         },
    //         select: false
    //     }
    // });

    // var UserSchema2 = new Schema({
    //   name: String,
    //   email: {
    //       type: String, required: true,
    //       trim: true, unique: true,
    //       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //   },
    //   accounts: [
    //            { kind: 'facebook',
    //              uid: 'fred.rogers'
    //            },
    //            { kind: 'google',
    //              username: 'frogers',
    //              password: '5d41402abc4b2a76b9719d911017c592'
    //            },
    //            { kind: 'twitter',
    //              uid: String
    //            }
    //         ]
    // })

    var UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: false,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        facebookProvider: {
            type: {
                provider: "facebook",
                id: String,
                username: String,
                token: String
            },
            select: false
        },
        twitterProvider: {
            type: {
                provider: "twitter",
                id: String,
                username: String,
                token: String
            },
            select: false
        },
        googleProvider: {
            type: {
                provider: "google",
                id: String,
                username: String,
                token: String
            },
            select: false
        }
    });

    UserSchema.set('toJSON', {getters: true, virtuals: true});

    // UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    //     var that = this;
    //     // console.log(profile);
    //     return this.findOne({
    //         'twitterProvider.id': profile.id
    //     }, function(err, user) {
    //         // no user was found, lets create a new one
    //         if (!user) {
    //             var newUser = new that({
    //                 email: profile.emails[0].value,
    //                 twitterProvider: {
    //                     id: profile.id,
    //                     username: profile.displayName,
    //                     token: token,
    //                     tokenSecret: tokenSecret
    //                 }
    //             });
    //
    //             newUser.save(function(error, savedUser) {
    //                 if (error) {
    //                     console.log(error);
    //                 }
    //                 return cb(error, savedUser);
    //             });
    //         } else {
    //             return cb(err, user);
    //         }
    //     });
    // };
    UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
        var that = this;
        // console.log(profile);
        return this.findOne({
          $or: [
            { 'twitterProvider.id': profile.id },
            { 'email': profile.emails[0].value }
          ]

        }, function(err, user) {
            console.log("user found as: ", user);
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    email: profile.emails[0].value,
                    twitterProvider: {
                        id: profile.id,
                        username: profile.displayName,
                        token: token,
                        tokenSecret: tokenSecret
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("new user saved as: ", savedUser);
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    // UserSchema.statics.upsertTwitterUser = async function(token, tokenSecret, profile, cb) {
    //   var that = this;
    //   try {
    //     console.log('Trying to find a user...')
    //     let user = await this.findOne({
    //       'twitterProvider.id': profile.id
    //     });
    //     if (!user) {
    //       console.log("User not found...creating a new user!")
    //       let newUser = new that({
    //         email: profile.emails[0].value,
    //         twitterProvider: {
    //             id: profile.id,
    //             username: profile.displayName,
    //             token: token,
    //             tokenSecret: tokenSecret
    //       }
    //     });
    //
    //       newUser.save(function(error, savedUser) {
    //           if (error) {
    //             console.log(error);
    //           }
    //           console.log("user saved as : ", savedUser);
    //
    //           return cb(null, savedUser);
    //       });
    //
    //     } else {
    //       console.log("user found as ", user);
    //       return cb(null, user);
    //     }
    //   } catch (error) {
    //     console.log("found an error!: ", error);
    //     return cb(error, null);
    //   }
    //
    // }

    UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'facebookProvider.id': profile.id
        }, function(err, user) {
            console.log("user found as: ", user);
            // no user was found, lets create a new one
            if (!user) {
                var newUser = new that({
                    email: profile.emails[0].value,
                    facebookProvider: {
                        id: profile.id,
                        username: profile.displayName,
                        token: accessToken,
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("new user saved as: ", savedUser);
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
        var that = this;
        return this.findOne({
            'googleProvider.id': profile.id
        }, function(err, user) {
            // no user was found, lets create a new one
            console.log("user:", user)
            if (!user) {
                var newUser = new that({
                    email: profile.emails[0].value,
                    googleProvider: {
                        id: profile.id,
                        username: profile.displayName,
                        token: accessToken,
                    }
                });

                newUser.save(function(error, savedUser) {
                    if (error) {
                        console.log(error);
                    }
                    console.log("new user saved as: ", savedUser);
                    return cb(error, savedUser);
                });
            } else {
                return cb(err, user);
            }
        });
    };

    mongoose.model('User', UserSchema);

    return db;
};
