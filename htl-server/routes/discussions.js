const express = require("express");
const router = express.Router({mergeParams: true});

const {
  createDiscussion,
  deleteDiscussion,
  getOneDiscussion,
  getAllDiscussions,
  postCommentToDiscussion,
  removeCommentFromDiscussion
 } = require("../handlers/discussions");

// prefix - /api/user/:userID/discussions
router
  .route('/')
  .post(createDiscussion);

// prefix - /api/user/:userID/discussions
router
  .route('/:discussionID')
  .delete(deleteDiscussion)
  .get(getOneDiscussion)
  .post(postCommentToDiscussion)

  // prefix - /api/user/:userID/discussions
router
  .route('/:discussionID/comments/:commentID')
  .delete(removeCommentFromDiscussion)


module.exports = router;
