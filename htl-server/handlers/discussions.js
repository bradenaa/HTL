const db = require("../models");

//TODO: Clean up these responses to match only the needed data on the front-end. Write tests, if needed.

// /api/user/:userID/discussions
exports.createDiscussion = async function(req, res, next) {
  try {
    const { userID } = req.params;
    const { title, post } = req.body;
    // create the discussion with data passed from the front end
    let discussion = await db.Discussion.create({
      title: title,
      post: post,
      userCreated: userID,
    });

    let foundDiscussion = await db.Discussion.findById(discussion._id)
      .populate({
        path:"userCreated",
        model: "User"
      });

    return res.status(200).json(foundDiscussion);
  } catch(err) {
    console.log("Error in createDiscussion:", err);
    return next(err);
  }
}

exports.upVoteDiscussion = async function(req, res, next) {
  try {
    const { userID, discussionID } = req.params;
    // Find discussion by ID and remove
    let foundDiscussion = await db.Discussion.findById(discussionID);
    // Check if user has already upvoted
    if (foundDiscussion.upVotes.indexOf(userID) !== -1) {
      return next({
        status: 400,
        message: "This discussion has already been up voted by this user"
      })
    }
    // Otherwise push userID into the upvotes array
    foundDiscussion.upVotes.push(userID);
    await foundDiscussion.save();

    return res.status(200).json(foundDiscussion);
  } catch (err) {
    console.log("Error in upVoteDiscussion:", err);
    return next(err)
  }
}


// /api/user/:userID/discussions/:discussionID
exports.deleteDiscussion = async function(req, res, next) {
  try {
    const { discussionID } = req.params;
    // Find discussion by ID and remove
    let foundDiscussion = await db.Discussion.findById(discussionID);
    await foundDiscussion.remove();
    return res.status(200).json(foundDiscussion);
  } catch (err) {
    console.log("Error in deleteDiscussion:", err);
    return next(err);
  }
};

// /api/user/:userID/discussions/:discussionID
exports.getOneDiscussion = async function(req, res, next) {
  try {
    const { discussionID } = req.params;
    // Find a discussion by ID and populate to format the response back to front end
    let discussion = await db.Discussion.findById(discussionID)
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
    console.log("Error in getOneDiscussion:", err);
    return next(err);
  }
};

// /api/user/:userID/discussions/:discussionID
exports.postCommentToDiscussion = async function(req, res, next) {
  try {
    const { userID, discussionID } = req.params;
    const { commentText } = req.body;
    // create the comment with data passed from the front end
    let comment = await db.Comment.create({
      text: commentText,
      author: userID,
    })

    // Find the associated discussion and push comment into comment array
    let foundDiscussion = await db.Discussion.findById(discussionID)
    foundDiscussion.comments.push(comment);
    await foundDiscussion.save();

    // Find and populate the new comment to respond with
    let foundComment = await db.Comment.findById(comment._id)
     .populate({
           path: 'author'
      });

    return res.status(200).json(foundComment);

  } catch(err) {
    console.log("Error in postCommentToDiscussion:", err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID
exports.removeCommentFromDiscussion = async function(req, res, next) {
  try {
    const { commentID } = req.params;
    // Find the comment by ID and remove
    let foundComment = await db.Comment.findById(commentID);
    await foundComment.remove();

    return res.status(200).json(foundComment);
  } catch (err) {
    console.log("Error in removeCommentFromDiscussion:", err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID
exports.postReplyToComment = async function(req, res, next) {
  try {
    const { userID, commentID } = req.params;
    const { replyText } = req. body
    // create the reply with data passed from the front end
    let reply = await db.Reply.create({
      replyText: replyText,
      author: userID
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
    let foundComment = await db.Comment.findById(commentID)
    foundComment.replies.push(reply);
    await foundComment.save();

    // respond with reply and the comment ID
    return res.status(200).json({
      commentID: foundComment._id,
      reply: foundReply,
    });

  } catch (err) {
    console.log("Error in postReplyToComment:", err);
    return next(err);
  }
}

// /api/user/:userID/discussions/:discussionID/comments/:commentID/replies/:replyID
exports.removeReplyFromComment = async function(req, res, next) {
  try {
    const { replyID } = req.params;
    // Find the reply by ID and remove
    let foundReply = await db.Reply.findById(replyID);
    await foundReply.remove();
    return res.status(200).json(foundReply);
  } catch (err) {
    console.log("Error in removeReplyFromComment:", err);
    return next(err);
  }
}
