'use strict'
//require('./app/index')
var db = require('./db/DylansDB')
var func = require('./extras/functions')
var bodyParser = require('body-parser')

//server set up --using express
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(port, (err) => {
  if (err) {
    return console.log('Port ' + err);
  };
  console.log(`server is listening on ${port}`);
});



//load page
app.get('/', function(request, response) {
  response.sendfile("index.html");
});


//get all usernames
app.get('/users', function(request, response) {
  db.sqlQuery("SELECT username FROM user", function(usernames){
    func.sendToFront(200, usernames, response);
  },
  function(err){
    console.log(err);
    func.sendToFront(500, null, response);
  });
});




//get user by id
app.get('/user/:id', function (request, response) {
  var id = func.isId(request.params.id);
  if (!id){
    console.log("bad data");
    func.sendToFront(501, null, response);
  }else{
    var q = "SELECT username, email FROM user WHERE id=?"
    var myQuery = q.replace("?", id)
    db.sqlQuery(myQuery, function(user){
      func.sendToFront(200, user, response);
      },
      function(err){
        console.log(err);
        func.sendToFront(500, null, response);
      });
  };
});






//update user
app.post('/user/:id', function (request, response) {
  var id = func.isId(request.params.id);
  var input = request.body;
  if (!id || !func.isUser(input)){
    console.log("bad data");
    func.sendToFront(501, null, response);
  }else{
    input.password = func.hash(input.password);
    db.sqlQueryParms("UPDATE user SET ? WHERE id=" + id, input, function(result){
      func.sendToFront(200, result.affectedRows, response);
      },
      function(err){
        console.log(err);
        func.sendToFront(500, null, response);
      });
    }
  });









//insert user
app.put('/user', function (request, response) {
var input = request.body;
if (!func.isUser(input)){
  console.log("bad data");
  func.sendToFront(501, null, response);
}else{
  input.password = func.hash(input.password);
  db.sqlQueryParms("INSERT user SET ?", input, function(result){
    func.sendToFront(200, result.affectedRows, response);
    },
      function(err){
        console.log(err);
        func.sendToFront(501, null, response);
      });
    }
  });




  //delete user
  app.delete('/user/:id', function (request, response) {
    var id = func.isId(request.params.id);
    if (!id){
        console.log("bad data");
        func.sendToFront(501, null, response);
      }else{
        var q = "DELETE FROM user WHERE id=?"
        var myQuery = q.replace("?", id)
        db.sqlQuery(myQuery, function(user){
            func.sendToFront(200, user.affectedRows, response);
          },
            function(err){
              console.log(err);
              func.sendToFront(500, null, response);
            });
          }
        });



// db.sqlQuery(function(cn) {
//   cn.query("SELECT username FROM dylansdb.user", function(err, row) {
//       if(err){
//         console.log('Query ' + err);
//         return;
//       }
//     cn.release();
//   });
// });
