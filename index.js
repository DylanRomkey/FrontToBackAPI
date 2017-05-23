'use strict'
var bodyParser = require('body-parser');

//server set up --using express
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




//load page
app.get('/', function(request, response) {
  response.sendfile("index.html");
});


//load APIs
require('./userAPI')(app);
require('./loginAPI')(app);



// check port
app.listen(port, (err) => {
  if (err) {
    return console.log('Port ' + err);
  };
  console.log(`server is listening on ${port}`);
});
