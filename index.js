'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan  = require('morgan');
var config = require('./config');


//server set up
var app = express();
var port = 3000;

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('superSecret', config.secret);



//load basic route
app.get('/', function(request, response) {
  response.send('Must first go to http://localhost:' + port + '/auth before access is granted')
  //response.sendfile("index.html");
});


//load APIs
require('./APIs/userAPI')(app);
require('./APIs/loginAPI')(app);



// listen on port
app.listen(port, (err) => {
  if (err) {
    return console.log('Port ' + err);
  };
  console.log(`server is listening on ${port}`);
});
