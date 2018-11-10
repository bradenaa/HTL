const express = require("express");
const router = express.Router({mergeParams: true});

const {
  getUserProfile,
} = require("../handlers/profile");

// prefix - /api/user/:userID/profile
router
  .route('/')
  .get(getUserProfile);


module.exports = router;
