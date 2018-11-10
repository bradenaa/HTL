const db = require("../models");

exports.createEvent = async function(req, res, next) {
  try {
    // create the event with data passed from the front end
    let event = await db.Event.create({
      title: req.body.title,
      neighborhood: req.body.neighborhood,
      date: req.body.date,
      userCreated: req.params._id
    });

    // Find the user by ID and push this event in profile event array
    let foundUser = await db.User.findById(req.params._id);
    foundUser.events.push(event._id);
    await foundUser.save();

    // find the created event and populate the response for the front end
    let foundEvent = await db.Event.findById(event._id).populate("usersAttending", {
      email: true,
    });
    // Push user created into the attending array and save
    foundEvent.usersAttending.push(req.params._id);
    await foundEvent.save(function (err, next){
      if (err) next(err);
    })
    return res.status(200).json(foundEvent);
  } catch(err) {
    return next(err);
  }
}


// /api/users/:id/messages/:message_id
exports.deleteEvent = async function(req, res, next) {
  try {
    let foundEvent = await db.Event.findById(req.params.event_id);
    await foundEvent.remove();
    return res.status(200).json(foundEvent);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.joinEvent = async function(req, res, next) {
  try {
    // Find the event by ID
    let foundEvent = await db.Event.findById(req.params.event_id);

    // If too many attending, then return 400 status with message
    if (foundEvent.usersAttending.length > 3) {
      return next({
        status: 400,
        message: "This event is already full"
      })
    }

    // Changed the 'object' array item to a string and check if user ID is there
    let attendingArr = await foundEvent.usersAttending.map(e => e.toString());
    let alreadyAttending = await attendingArr.includes(req.params._id);

    // If user is not already attending the push ID into attending array and save
    if (!alreadyAttending) {
      foundEvent.usersAttending.push(req.params._id);
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
