const express = require("express");
const router = express.Router({mergeParams: true});

const { createEvent, deleteEvent, joinEvent } = require("../handlers/events");

// prefix - /api/users/:id/events
router.route('/').post(createEvent);

// prefix - /api/users/:id/events/:event_id
router
  .route('/:event_id')
  .delete(deleteEvent)
  .put(joinEvent)


module.exports = router;
