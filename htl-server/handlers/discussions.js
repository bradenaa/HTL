const db = require("../models");

//TODO: Clean up these responses to match only the needed data on the front-end. Write tests, if needed.

// /api/user/:userID/discussions
exports.createDiscussion = async function(req, res, next) {
  try {
    // create the discussion with data passed from the front end
    let discussion = await db.Discussion.create({
      title: req.body.title,
      post: req.body.post,
      userCreated: req.params.userID
    });

    let foundDiscussion = await db.Discussion.findById(discussion._id)
      .populate({
        path:"userCreated",
        model: "User"
      });

    console.log('discussion response on the BACKEND', discussion);
    console.log('foundDiscussion response on the BACKEND', foundDiscussion);
    return res.status(200).json(foundDiscussion);
  } catch(err) {
    console.log(err);
    return next(err);
  }
}


// /api/user/:userID/discussions/:discussionID
exports.deleteDiscussion = async function(req, res, next) {
  try {
    // Find discussion by ID and remove
    let foundDiscussion = await db.Discussion.findById(req.params.discussionID);
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
    // Find a discussion by ID and populate to format the response back to front end
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

// /api/user/:userID/discussions/:discussionID
exports.postCommentToDiscussion = async function(req, res, next) {
  try {
    // create the comment with data passed from the front end
    let comment = await db.Comment.create({
      text: req.body.commentText,
      author: req.params.userID
    })

    // Find the associated discussion and push comment into comment array
    let foundDiscussion = await db.Discussion.findById(req.params.discussionID)
    foundDiscussion.comments.push(comment);
    await foundDiscussion.save();

    // Find and populate the new comment to respond with
    let foundComment = await db.Comment.findById(comment._id)
     .populate({
           path: 'author'
      });

    return res.status(200).json(foundComment);

  } catch(err) {
    console.log(err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID
exports.removeCommentFromDiscussion = async function(req, res, next) {
  try {
    // Find the comment by ID and remove
    let foundComment = await db.Comment.findById(req.params.commentID);
    await foundComment.remove();
    return res.status(200).json(foundComment);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID
exports.postReplyToComment = async function(req, res, next) {
  try {
    // create the reply with data passed from the front end
    let reply = await db.Reply.create({
      replyText: req.body.replyText,
      author: req.params.userID
    });

  // Find the created reply to populate the response as needed.
   let foundReply = await db.Reply.findById(reply._id)
     .populate({
       path: "author",
       populate: {
           path: 'author',
           model: 'User',
         }
     })

    // Find comment and push reply into the array
    let foundComment = await db.Comment.findById(req.params.commentID)
    foundComment.replies.push(reply);
    await foundComment.save();

    // respond with reply and the comment ID
    return res.status(200).json({
      commentID: foundComment._id,
      reply: foundReply,
    });

  } catch (err) {
    console.log(err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID/replies/:replyID
exports.removeReplyFromComment = async function(req, res, next) {
  try {
    // Find the reply by ID and remove
    let foundReply = await db.Reply.findById(req.params.replyID);
    await foundReply.remove();
    return res.status(200).json(foundReply);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}
