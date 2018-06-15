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
exports.getOneDiscussion = async function(req, res, next) {
  try {
    let discussion = await db.Discussion.findById(req.params.discussionID)
      .populate({
        path: "comments",
        populate: {
          path: 'author',
          select: 'displayName'
        }
     });
    return res.status(200).json(discussion);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// /api/user/:userID/discussions
exports.postCommentToDiscussion = async function(req, res, next) {
  try {
    // create the event with data passed from the front end
    let comment = await db.Comment.create({
      text: req.body.text,
      author: req.params.userID
    })

    let foundDiscussion = await db.Discussion.findById(req.params.discussionID)
    foundDiscussion.comments.push(comment);
    await foundDiscussion.save();

    let populatedDiscussion = await db.Discussion.findById(req.params.discussionID)
      .populate({
        path: "comments",
        populate: {
          path: 'author',
          select: 'displayName'
        }
     });


    console.log("+++++++++++", comment);

    console.log("=============", foundDiscussion);

    return res.status(200).json(populatedDiscussion);
  } catch(err) {
    console.log(err);
    return next(err);
  }
}

exports.removeCommentFromDiscussion = async function(req, res, next) {
  try {
    let foundComment = await db.Comment.findById(req.params.commentID);
    await foundComment.remove();
    return res.status(200).json(foundComment);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
