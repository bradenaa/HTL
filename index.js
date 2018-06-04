const express = require("express");
      app     = express();
      favicon = require('serve-favicon');
      path    = require('path');


var port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')));

app.get('/', function(req, res, next){
  res.render('index');
})

// app.get('/FAQ', function(req, res, next){
//   res.send("questions and answers");
// });
//
// app.get('/safety', function(req, res, next){
//   res.send("safety things");
// });
//
// app.get('/code_of_conduct', function(req, res, next){
//   res.send("code of conduct page");
// })

app.listen(port, process.env.IP, function(){
  console.log(`The server is started and is listening on ${port}`);
})
