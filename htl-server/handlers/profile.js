const db = require("../models");

// /api/user/:userID/profile
exports.getUserProfile = async function(req, res, next) {
  try {
    const { userID } = req.params;
    let foundUser = await db.User.findById(userID)
      .populate({
        path: 'discussions',
        model: 'Discussion',
      });

      console.log("++++++ User Query  Result +++++");
      console.log(foundUser)
      console.log("+++++++++++++++++++++++++++++++");

     //  .populate({
     //    path: "comments",
     //    model: 'Comment',
     //    populate: [
     //      {
     //        path: 'author',
     //        model: 'User',
     //      },
     //      {
     //        path: 'replies',
     //        model: 'Reply',
     //        populate: {
     //          path: "author",
     //          model: "User"
     //        }
     //      }
     //    ]
     // });

     return res.status(200).json(foundUser);

  } catch (err) {
    console.log("Error in the getUserProfile function: ", err);
    return next(err);
  }
}
