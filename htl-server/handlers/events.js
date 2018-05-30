const db = require("../models");

exports.createEvent = async function(req, res, next) {
  try {
    let event = await db.Event.create({
      title: req.body.title,
      neighborhood: req.body.neighborhood,
      date: req.body.date,
      user: req.params.id
    });
    console.log("event: ", event);

    let foundUser = await db.User.findById(req.params.id);
    foundUser.events.push(event.id);
    await foundUser.save();
    console.log("found user: ", foundUser);
    let foundEvent = await db.Event.findById(event._id).populate("user", {
      displayName: true,
    });
    console.log("foundEvent: ", foundEvent);
    return res.status(200).json(foundEvent);
  } catch(err) {
    return next(err);
  }
}


// /api/users/:id/messages/:message_id
exports.deleteEvent = async function(req, res, next) {
  try {
    let foundEvent = await db.Event.findById(req.params.event_id);
    console.log("found event", foundEvent);
    await foundEvent.remove();

    return res.status(200).json(foundEvent);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
