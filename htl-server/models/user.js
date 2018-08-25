const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
      type: String, required: true,
      trim: true, unique: false,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  displayName: {
    type: String,
    default: "NEW USER"
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
  },
  hasPromo: {
    type: Boolean,
    default: false,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },
  ],
  discussions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion"
    }
  ]
})

userSchema.set('toJSON', {getters: true, virtuals: true});

userSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
  var that = this;
  // returns the found user if found by profileID or by email (in case of multiple social accounts with the same email)
    return this.findOne({
      $or: [
        { 'twitterProvider.id': profile.id },
        { 'email': profile.emails[0].value }
      ]
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            var newUser = new that({
                email: profile.emails[0].value,
                twitterProvider: {
                    id: profile.id,
                    username: profile.displayName,
                    token: token,
                    tokenSecret: tokenSecret
                },
                hasPromo: false
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  // returns the found user if found by profileID or by email (in case of multiple social accounts with the same email)
    return this.findOne({
      $or: [
        { 'googleProvider.id': profile.id },
        { 'email': profile.emails[0].value }
      ]
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            var newUser = new that({
                email: profile.emails[0].value,
                googleProvider: {
                    id: profile.id,
                    username: profile.displayName,
                    token: accessToken,
                },
                hasPromo: false
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

// FB specific function to create a user
userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  // returns the found user if found by profileID or by email (in case of multiple social accounts with the same email)
    return this.findOne({
      $or: [
        { 'facebookProvider.id': profile.id },
        { 'email': profile.emails[0].value }
      ]
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
            var newUser = new that({
                email: profile.emails[0].value,
                facebookProvider: {
                    id: profile.id,
                    username: profile.displayName,
                    token: accessToken,
                },
                hasPromo: false
            });
            // Save the newly created user
            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
