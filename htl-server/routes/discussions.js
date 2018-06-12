const express = require("express");
const router = express.Router({mergeParams: true});

const { createDiscussion, deleteDiscussion, getDiscussion, getAllDiscussions } = require("../handlers/discussions");

// prefix - /api/user/:userID/discussions
router
  .route('/')
  .post(createDiscussion);

// prefix - /api/user/:userID/discussions
router
  .route('/:discussionID')
  .delete(deleteDiscussion)


module.exports = router;
