require('dotenv').config();

const express       = require("express");
      app           = express();
      cors          = require("cors");
      bodyParser    = require("body-parser");
      session       = require("express-session");
      cookieParser  = require("cookie-parser");

      errorHandler  = require("./handlers/error");

      authRoutes    = require("./routes/auth");


const port = process.env.PORT || 8081;

// app.set("view engine", "ejs");

// app.use(express.static(__dirname + "/public"));


app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: "bailey is the best dog",
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get('/', function(req, res, next){
  res.send("hello");
});

app.use( (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);


app.listen(port, process.env.IP, function(){
  console.log(`The server is started and is listening on ${port}`);
})
