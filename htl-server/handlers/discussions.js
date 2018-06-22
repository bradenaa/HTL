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

    // let foundDiscussion = await db.Discussion.create({
    //
    // })

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
        model: 'Comment',
        populate: [
          {
            path: 'author',
            model: 'User',
          },
          {
            path: 'replies',
            model: 'Reply',
            populate: {
              path: "author",
              model: "User"
            }
          }
        ]
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

exports.postReplyToComment = async function(req, res, next) {
  try {
    // create the reply with the Reply model schema
    let reply = await db.Reply.create({
      text: req.body.text,
      author: req.params.userID
    });

    // Find comment and push reply into the array
    let foundComment = await db.Comment.findById(req.params.commentID)
    foundComment.replies.push(reply);
    await foundComment.save();

    //Find the comment again and populate for the frontend
    let populatedComment = await db.Comment.findById(req.params.commentID)
      .populate({
        path: "replies",
        populate: {
          path: 'author',
          select: 'displayName'
        }
      });

    console.log("++++++++++++++reply", reply);
    console.log("==============foundComment", foundComment);
    console.log("--------------populatedComment", populatedComment);

    return res.status(200).json(populatedComment);

  } catch (err) {
    console.log(err);
    return next(err);
  }
}

exports.removeReplyFromComment = async function(req, res, next) {
  try {
    let foundReply = await db.Reply.findById(req.params.replyID);
    await foundReply.remove();
    return res.status(200).json(foundReply);    
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
