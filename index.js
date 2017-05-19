'use strict'
//require('./app/index')
var db = require('./db/DylansDB')
var validator = require('./extras/functions')
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
    console.log("usernames ", usernames);
    response.statusCode = 200;
    response.send({
      success: true,
      rows: usernames.length,
      data : usernames
    });
  },
  function(err){
    response.statusCode = 500;
    response.send({
      success: false,
      rows: 0,
      data : null,
      message: 'An error occured making your request'
    });
    console.log(err);
  });
  console.log('data recieved');
});




//get user by id
app.get('/user/:id', function (request, response) {
  var id = validator.isId(request.params.id);
  if (!id){
    console.log("bad data");
    response.statusCode = 501;
    response.send({
      success: false,
      rows: 0,
      data : null,
      message: 'Incorrect data was sent in'
    });
  }else{
    var q = "SELECT username, email FROM user WHERE id=?"
    var myQuery = q.replace("?", id)
    db.sqlQuery(myQuery, function(user){
      console.log(user);
        response.statusCode = 200;
        response.send({
          success: true,
          rows: user.length,
          data : user,
          message: 'Request was a success'
        })
      },
        function(err){
          response.statusCode = 500;
          response.send({
            success: false,
            rows: 0,
            data : null,
            message: 'An error occured making your request'
          });
          console.log(err);
        });
      }
    });






//update user
app.post('/user/:id', function (request, response) {
  var id = validator.isId(request.params.id);
  var input = request.body;
  if (!id || !validator.isUser(input)){
    console.log("bad data");
    response.statusCode = 501;
    response.send({
      success: false,
      data : null,
      message: 'Incorrect data was sent in'
    });
  }else{
    db.sqlQueryParms("UPDATE user SET ? WHERE id=" + id, input, function(result){
      console.log(result);
        response.statusCode = 200;
        response.send({
          success: true,
          data : result,
          message: 'Request was a success'
        });
      },
      function(err){
        response.statusCode = 500;
        response.send({
          success: false,
          data : null,
          message: 'An error occured making your request'
        });
        console.log(err);
      });
    }
  });









//insert user
app.put('/user', function (request, response) {
var input = request.body;
if (!validator.isUser(input)){
  console.log("bad data");
  response.statusCode = 501;
  response.send({
    success: false,
    data : null,
    message: 'Incorrect data was sent in'
  });
}else{
  db.sqlQueryParms("INSERT user SET ?", input, function(result){
    console.log(result);
      response.statusCode = 200;
      response.send({
        success: true,
        data : result,
        message: 'Request was a success'
      })
    },
      function(err){
        response.statusCode = 500;
        response.send({
          success: false,
          data : null,
          message: 'An error occured making your request'
        });
        console.log(err);
      });
    }
  });




  //delete user
  app.delete('/user/:id', function (request, response) {
    var id = validator.isId(request.params.id);
    if (!id){
        console.log("bad data");
        response.statusCode = 501;
        response.send({
          success: false,
          rows: 0,
          data : null,
          message: 'Incorrect data was sent in'
        });
      }else{
        var q = "DELETE FROM user WHERE id=?"
        var myQuery = q.replace("?", id)
        db.sqlQuery(myQuery, function(user){
          console.log(user);
            response.statusCode = 200;
            response.send({
              success: true,
              rows: user.length,
              data : user,
              message: 'Request was a success'
            })
          },
            function(err){
              response.statusCode = 500;
              response.send({
                success: false,
                rows: 0,
                data : null,
                message: 'An error occured making your request'
              });
              console.log(err);
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
