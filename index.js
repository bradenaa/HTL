const express = require("express");
      app     = express();


var port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res, next){
  res.render('index');
})

app.listen(port, process.env.IP, function(){
  console.log(`The server is started and is listening on ${port}`);
})
