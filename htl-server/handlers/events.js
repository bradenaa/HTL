const db = require("../models");

exports.createEvent = async function(req, res, next) {
  try {
    // create the event with data passed from the front end
    let event = await db.Event.create({
      title: req.body.title,
      neighborhood: req.body.neighborhood,
      date: req.body.date,
      userCreated: req.params.id
    });

    console.log("++++++++++++", event);

    console.log("=============", req.params.id);

    //push the users who created into the usersAttending array
    // event.usersAttending.push(req.params.id);
    // console.log("event: ", event);

    // grab the user and push this event in their profile
    let foundUser = await db.User.findById(req.params.id);
    foundUser.events.push(event.id);
    await foundUser.save();
    // console.log("found user: ", foundUser);

    // find the created event
    let foundEvent = await db.Event.findById(event._id).populate("usersAttending", {
      email: true,
    });
    foundEvent.usersAttending.push(req.params.id);
    await foundEvent.save(function (err, next){
      if (err) next(err);
    })
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

exports.joinEvent = async function(req, res, next) {
  try {
    // Find the target event
    let foundEvent = await db.Event.findById(req.params.event_id);

    // If there are too many that have joined, return a message
    if (foundEvent.usersAttending.length > 3) {
      return next({
        status: 400,
        message: "This event is already full"
      })
    }

    // Changed the 'object' array item to a string, then checked if
    // the user was already a part of the event
    let attendingArr = await foundEvent.usersAttending.map(e => e.toString());
    let alreadyAttending = await attendingArr.includes(req.params.id);

    // If they are not already attending, then add them
    if (!alreadyAttending) {
      foundEvent.usersAttending.push(req.params.id);
      await foundEvent.save()
      return res.status(200).json(foundEvent);
    } else {
      return next({
        status: 400,
        message: "Have already joined this event"
      })
    }
  } catch (err) {
    return next(err)
  }
}
