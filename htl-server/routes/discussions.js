const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createDiscussion,
  deleteDiscussion,
  getOneDiscussion,
  getAllDiscussions,
  postCommentToDiscussion,
  removeCommentFromDiscussion,
  postReplyToComment,
  removeReplyFromComment,
  upVoteDiscussion,
 } = require("../handlers/discussions");

// prefix - /api/user/:userID/discussions
router
  .route('/')
  .post(createDiscussion);

// prefix - /api/user/:userID/discussions
router
  .route('/:discussionID')
  .put(upVoteDiscussion)
  .delete(deleteDiscussion)
  //ShowDiscussion
  .get(getOneDiscussion)
  .post(postCommentToDiscussion)

// prefix - /api/user/:userID/discussions
router
  .route('/:discussionID/comments/:commentID')
  .delete(removeCommentFromDiscussion)
  .post(postReplyToComment)

// prefix - /api/user/:userID/discussions
router
  .route('/:discussionID/comments/:commentID/replies/:replyID')
  .delete(removeReplyFromComment)



module.exports = router;
