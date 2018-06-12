const db = require("../models");

// /api/user/:userID/discussions
exports.createDiscussion = async function(req, res, next) {
  try {
    // create the event with data passed from the front end
    let discussion = await db.Discussion.create({
      title: req.body.title,
      post: req.body.post,
      userCreated: req.params.userID
    });

    // console.log("+++++++++++", discussion);

    console.log("=============", req.params.userID);

    return res.status(200).json(discussion);
  } catch(err) {
    console.log(err);
    return next(err);
  }
}


// /api/user/:userID/discussions/:discussionID
exports.deleteDiscussion = async function(req, res, next) {
  try {
    console.log(req.params.discussionID);
    console.log(req.params.userID);
    let foundDiscussion = await db.Discussion.findById(req.params.discussionID);
    console.log("found discussion", foundDiscussion);
    await foundDiscussion.remove();

    return res.status(200).json(foundDiscussion);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// /api/user/:userID/discussions/:discussionID
exports.getDiscussion = async function(req, res, next) {
  try {
    let discussion = await db.Discusson.find(req.params.discussionID);
    return res.status(200).json(discussion);
  } catch (err) {
    return next(err);
  }
};
