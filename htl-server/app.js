require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const db = require("./models");

// ======================================
// ============== ROUTES ================
// ======================================
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const discussionRoutes = require('./routes/discussions');
const profileRoutes = require('./routes/profile');

// ======================================
// ============== Handlers ==============
// ======================================
const errorHandler = require('./handlers/error');

// ======================================
// ============= Middleware =============
// ======================================
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");


// Initializing the app
const app = express();

// Setting CORS options for front end communication purposes
const corsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors());

// ======================================
// ============ VIEW ENGINE =============
// ======================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ======================================
// ========== ROUTE USAGE ===============
// ======================================

app.use('/api/auth', authRoutes);

app.use(
  "/api/user/:userID/events",
  loginRequired,
  ensureCorrectUser,
  eventRoutes,
);

app.use(
  "/api/user/:userID/discussions",
  loginRequired,
  ensureCorrectUser,
  discussionRoutes,
);

app.use(
  "/api/user/:userID/profile",
  loginRequired,
  ensureCorrectUser,
  profileRoutes,
)

app.get("/api/events", loginRequired, async function(req, res, next){
  try {
    let events = await db.Event.find({})
      .sort({ createdAt: "desc"})
      .populate("usersAttending", {
        email: true,
      });
      console.log(events.usersAttending);
    return res.status(200).json(events);
  } catch (err) {
    return next(err);
  }
})

app.get('/api/discussions', loginRequired, async function(req, res, next){
  try {
    let discussions = await db.Discussion.find({})
      .sort({ createdAt: "desc"})
      .populate("userCreated", {
        email: true,
        displayName: true
      });
    return res.status(200).json(discussions);
  } catch (err) {
    console.log("Error in the get all discussions:", err);
    return next(err);
  }
})

// ======================================
// =========== Error Handler ============
// ======================================

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
