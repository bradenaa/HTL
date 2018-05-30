require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./models");

// Routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// Handlers
const errorHandler = require('./handlers/error');

// Middleware
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();

const corsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors());

// view engine setup
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
  "/api/users/:id/events",
  loginRequired,
  ensureCorrectUser,
  eventRoutes
);

app.get("/api/events", loginRequired, async function(req, res, next){
  try {
    let events = await db.Event.find({})
      .sort({ createdAt: "desc"})
      .populate("user", {
        email: true,
      });
      console.log(events);
    return res.status(200).json(events);
  } catch (err) {
    return next(err);
  }
})




// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
