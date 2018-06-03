const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
})

userSchema.set('toJSON', {getters: true, virtuals: true});

userSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    var that = this;
    // console.log(profile);
    return this.findOne({
      $or: [
        { 'twitterProvider.id': profile.id },
        { 'email': profile.emails[0].value }
      ]

    }, function(err, user) {
        // console.log("user found as: ", user);
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

userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'googleProvider.id': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        // console.log("user:", user)
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
                // console.log("new user saved as: ", savedUser);
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
